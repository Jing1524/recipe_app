// Recipes.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Recipes from './Recipes';
import * as useRecipesHooks from '@/hooks/useRecipes';
import * as useSearchQueryContext from '@/context/useSearchQuery';

// Mock the custom hooks and context
jest.mock('@/hooks/useRecipes', () => ({
  useSearchRecipes: jest.fn(),
}));
jest.mock('@/context/useSearchQuery', () => ({
  useSearchQuery: jest.fn(),
}));

describe('Recipes Component', () => {
  // Mock data for the tests
  const mockRecipesData = [
    { id: '1', title: 'Chicken Soup', image: 'chicken-soup.jpg', imagetype: 'jpg' },
    { id: '2', title: 'Beef Stew', image: 'beef-stew.jpg', imagetype: 'jpg' },
  ];

  beforeEach(() => {
    // Default mock implementations
    useRecipesHooks.useSearchRecipes.mockReturnValue({ isLoading: false, isError: false, data: [] });
    useSearchQueryContext.useSearchQuery.mockReturnValue({ searchQuery: '' });
  });

  test('displays loading state', () => {
    useRecipesHooks.useSearchRecipes.mockReturnValue({ isLoading: true });
    render(<Recipes />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays error state', () => {
    useRecipesHooks.useSearchRecipes.mockReturnValue({ isError: true, error: { message: 'Error fetching recipes' } });
    render(<Recipes />);
    expect(screen.getByText(/Error: Error fetching recipes/i)).toBeInTheDocument();
  });

  test('displays recipes when fetched successfully', () => {
    useRecipesHooks.useSearchRecipes.mockReturnValue({ data: mockRecipesData });
    render(<Recipes />);
    mockRecipesData.forEach(recipe => {
      expect(screen.getByText(recipe.title)).toBeInTheDocument();
    });
  });
});
