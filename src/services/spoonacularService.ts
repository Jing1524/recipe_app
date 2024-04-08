import axios from "axios";
import { RecipeDetails } from "@/lib/types";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY; 



export const searchRecipes = async (query: string, page: number = 1) => {
  try {
    const response = await axios.get(`${apiUrl}/recipes/complexSearch`, {
      params: {
        apiKey: apiKey,
        query,
        number: 20,
        offset: (page - 1) * 20, 
      },
    });
    const totalPages = Math.ceil(response.data.totalResults / 20); 
    return {
      recipes: response.data.results,
      totalPages: totalPages,
      totalResults: response.data.totalResults,
    };
   
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};


// GET all recipes
export const fetchAllRecipes = async (page: number = 1) => {
  try {
    const response = await axios.get(`${apiUrl}/recipes/complexSearch`, {
      params: {
        apiKey: apiKey,
        number: 20, 
        offset: (page - 1) * 20,
      },
    });
    const totalPages = Math.ceil(response.data.totalResults / 20); 
    return {
      recipes: response.data.results || [],
      totalPages: totalPages,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    throw error;
  }
};

// GET recipeDetails
export const fetchRecipeDetails = async (recipeId: string): Promise<RecipeDetails> => {
  const url = `${apiUrl}/recipes/${recipeId}/information?apiKey=${apiKey}`;
  const response = await axios.get<RecipeDetails>(url);
  return response.data;
};
