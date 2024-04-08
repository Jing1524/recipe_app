jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
  }));
  
  
  jest.mock('../services/spoonacularService', () => ({
    fetchAllRecipes: jest.fn(),
    fetchRecipeDetails: jest.fn(),
    searchRecipes: jest.fn(),
  }));

import { useQuery } from '@tanstack/react-query';
import { fetchAllRecipes, fetchRecipeDetails, searchRecipes } from '../services/spoonacularService';
import { useRecipesList, useRecipeDetails } from '../hooks/useRecipes';


describe('useRecipesList', () => {
  it('calls searchRecipes when query is provided', () => {
    const query = 'chicken';
    useRecipesList(query);
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['recipes', query],
      queryFn: expect.any(Function),
    }));
    // Ensure the queryFn calls searchRecipes with the right argument
    const queryFn = useQuery.mock.calls[0][0].queryFn;
    queryFn();
    expect(searchRecipes).toHaveBeenCalledWith(query);
  });

  it('calls fetchAllRecipes when no query is provided', () => {
    useRecipesList('');
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['recipes', ''],
      queryFn: fetchAllRecipes,
    }));
  });
});


describe('useRecipeDetails', () => {
    it('fetches recipe details with a given id', () => {
      const recipeId = '123';
      useRecipeDetails(recipeId);
      expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
        queryKey: ['recipeDetails', recipeId],
        queryFn: expect.any(Function),
      }));
      // Check if queryFn correctly calls fetchRecipeDetails
      const queryFn = useQuery.mock.calls[0][0].queryFn;
      queryFn();
      expect(fetchRecipeDetails).toHaveBeenCalledWith(recipeId);
    });
  
    it('does not fetch details when id is undefined', () => {
      useRecipeDetails(undefined);
      expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
        enabled: false,
      }));
    });
  });