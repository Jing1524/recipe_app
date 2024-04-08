import axios from "axios";
import { searchRecipes, fetchAllRecipes, fetchRecipeDetails } from "./service"; // Adjust the import path according to your project structure

// Mock axios
jest.mock("axios");

describe("Service Functions", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    axios.get.mockClear();
  });

  describe("searchRecipes", () => {
    it("fetches recipes based on query and pagination and returns data", async () => {
      const mockData = {
        data: {
          results: [{ id: 1, title: "Test Recipe" }],
          totalResults: 100,
        },
      };
      axios.get.mockResolvedValue(mockData);

      const response = await searchRecipes("chicken", 2);

      expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
        params: expect.objectContaining({
          query: "chicken",
          number: 20,
          offset: 20, // Page 2 with 20 results per page
        }),
      });
      expect(response).toEqual({
        recipes: mockData.data.results,
        totalPages: 5, // 100 total results / 20 per page
        totalResults: 100,
      });
    });
  });

  describe("fetchAllRecipes", () => {
    it("fetches all recipes for a given page and returns data", async () => {
      const mockData = {
        data: {
          results: [{ id: 1, title: "All Recipe" }],
          totalResults: 40,
        },
      };
      axios.get.mockResolvedValue(mockData);

      const response = await fetchAllRecipes(1);

      expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
        params: expect.objectContaining({
          number: 20,
          offset: 0, // Page 1
        }),
      });
      expect(response).toEqual({
        recipes: mockData.data.results,
        totalPages: 2, // 40 total results / 20 per page
        totalResults: 40,
      });
    });
  });

  describe("fetchRecipeDetails", () => {
    it("fetches details for a specific recipe by ID", async () => {
      const mockRecipeDetails = {
        id: 715497,
        title: "Detailed Recipe",
        image: "recipe-image.jpg",
        readyInMinutes: 45,
        servings: 4,
        sourceUrl: "https://example.com/detailed-recipe",
        dishTypes: ["dessert"],
        diets: ["gluten free"],
        // TODO: Add more fields
      };
      axios.get.mockResolvedValue({ data: mockRecipeDetails });

      const response = await fetchRecipeDetails("715497");

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/715497/information`,
        {
          params: { apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY },
        }
      );
      expect(response).toEqual(mockRecipeDetails);
    });
  });
});
