"use client";

import { useRecipesList } from "@/hooks/useRecipes";
import RecipeCard from "./RecipeCard";
import { useSearchQuery } from "@/context/useSearchQuery";
import { Key } from "react";

import PaginationControls from "./PaginationControls";
import { useSearchParams } from "next/navigation";

interface Recipe {
  id: Key;
  image: string;
  title: string;
  imagetype: string;
}

const Recipes = () => {
  const { searchQuery } = useSearchQuery();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, isLoading, isError, error } = useRecipesList(searchQuery, page);
  const totalPages = data ? data.totalPages : 0;
  // Normalize the data structure
  let normalizedRecipes: Recipe[] = [];
  if (data && data.recipes) {
    if (searchQuery.length > 0 && data.recipes.results) {
      normalizedRecipes = data.recipes.results;
    } else {
      normalizedRecipes = data.recipes;
    }
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        Error: {error?.message}
      </div>
    );
  if (normalizedRecipes.length === 0)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        Sorry, no recipe found.
      </div>
    );
  return (
    <section className="py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {normalizedRecipes &&
          normalizedRecipes?.map((recipe: Recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                id={recipe.id}
              />
            );
          })}
      </div>
      <PaginationControls page = {page} totalPages = {totalPages}/>
    </section>
  );
};

export default Recipes;
