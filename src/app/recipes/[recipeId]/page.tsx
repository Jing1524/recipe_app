"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";

import { useRecipeDetails } from "@/hooks/useRecipes";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const RecipeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const recipeId = Array.isArray(params.recipeId)
    ? params.recipeId[0]
    : params.recipeId;

  const {
    data: recipeDetails,
    isLoading,
    isError,
    error,
  } = useRecipeDetails(recipeId);

  function stripHtml(html: string) {
    const parser = new DOMParser();

    const doc = parser.parseFromString(html, "text/html");

    return doc.body.textContent || "";
  }

  if (isLoading)
    return (
      <div className="flex w-screen h-screen flex-col items-center justify-center p-10">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex w-screen h-screen flex-col items-center justify-center p-10">
        Error: {error?.message}
      </div>
    );

  if (!recipeDetails)
    return (
      <div className="flex w-screen h-screen flex-col items-center justify-center p-10">
        No recipe details available.
      </div>
    );

  return (
    <div className="flex w-screen flex-col items-start p-28 gap-10">
      <div className="flex flex-col w-full h-auto lg:flex-row">
        <div className="flex flex-col justify-between h-full">
          <div>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="mb-5"
            >
              <ArrowLeftIcon className="mr-2" />
              Back
            </Button>
            <h2 className="font-bold text-2xl mb-8">{recipeDetails.title}</h2>
            {recipeDetails.dishTypes.length > 0 && (
              <BadgeList title="type" items={recipeDetails.dishTypes} />
            )}

            {recipeDetails.diets.length > 0 && (
              <BadgeList title="diets" items={recipeDetails.diets} />
            )}
          </div>
          {recipeDetails.occasions.length > 0 && (
            <BadgeList title="occasions" items={recipeDetails.occasions} />
          )}
        </div>
        <img
          src={recipeDetails.image}
          alt="recipeImg"
          className="rounded-lg ml-auto h-auto max-w-[600px] w-full"
        />
      </div>

      <div className="flex flex-col items-start mt-10">
        <p className="font-bold">ingredients list:</p>
        <div className="flex flex-col items-start gap-1">
          {/* remove duplicated ingredient */}
          {[
            ...new Map(
              recipeDetails?.extendedIngredients.map((ingredient) => [
                ingredient.id,
                ingredient,
              ])
            ).values(),
          ].map((ingredient) => (
            <div key={ingredient.id}>
              <p>{ingredient.original}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start">
        <p className="font-bold">How to:</p>

        <div className="flex flex-col items-start gap-1">
          {recipeDetails?.analyzedInstructions[0].steps.map((step) => {
            return <p key={step.number}>{step.step}</p>;
          })}
        </div>
      </div>

      <div>
        <h3 className="font-bold">Summary:</h3>
        <p>{stripHtml(recipeDetails.summary)}</p>
      </div>
    </div>
  );
};

export default RecipeDetailPage;

interface BadgeListProps {
  title: string;
  items: string[];
}

const BadgeList = ({ title, items }: BadgeListProps) => (
  <div className="my-4">
    <h3 className="font-bold text-md">{title}:</h3>
    <div className="flex flex-wrap gap-2 items-center my-2">
      {items.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>
  </div>
);
