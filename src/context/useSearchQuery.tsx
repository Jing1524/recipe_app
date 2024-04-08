"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type SearchQueryContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchQueryContext = createContext<SearchQueryContextType>(
  {} as SearchQueryContextType
);

// Provider component type
type SearchQueryProviderProps = {
  children: ReactNode;
};

export const SearchQueryProvider = ({ children }: SearchQueryProviderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = () => useContext(SearchQueryContext);
