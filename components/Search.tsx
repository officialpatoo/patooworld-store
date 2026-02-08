
import React from 'react';
import { SearchIcon } from './icons';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon />
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search features..."
        aria-label="Search features"
        className="w-full sm:w-64 bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      />
    </div>
  );
};
