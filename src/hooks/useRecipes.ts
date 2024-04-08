import { useQuery } from "@tanstack/react-query";
import { fetchAllRecipes, fetchRecipeDetails, searchRecipes } from "../services/spoonacularService";
import { RecipeDetails } from "@/lib/types";

export const useRecipesList = (query: string, page: number = 1) => {
  // Determine the query function based on whether a search query is provided
  const queryFn = query.length > 0
    ? () => searchRecipes(query, page)
    : () => fetchAllRecipes(page);

  return useQuery({
    queryKey: ["recipes", query, page],
    queryFn,
    staleTime: Infinity,
  });
};

export const useRecipeDetails = (recipeId: string | undefined) => {
  return useQuery<RecipeDetails, Error>({
    queryKey: ['recipeDetails', recipeId],
    queryFn: () => fetchRecipeDetails(recipeId!),
    enabled: !!recipeId, // Only fetch when recipeId is not undefined
  });
};
