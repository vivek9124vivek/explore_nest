// SearchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<{
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchQuery: '',
  setSearchQuery: () => {},
});
// custom hook which helps to access searchcontext
export const useSearch = () => useContext(SearchContext);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
