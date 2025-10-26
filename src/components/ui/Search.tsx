import { useState } from "react";

interface SearchProps {
  onSearch: (query: string, threshold?: number) => void;
  onClear: () => void;
}

export const Search = ({ onSearch, onClear }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (query.trim().length < 2) {
      setError("Please enter at least 2 characters");
      return;
    }

    setLoading(true);
    
    try {
      await onSearch(query, 0.75);
    } catch (error) {
      console.error('❌ Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setError("");
    onClear();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative flex items-center w-full min-w-0">
        <svg
          className="absolute left-2 sm:left-3 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>

        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          className="w-full min-w-0 rounded-md border border-gray-200 bg-white 
                     pl-7 sm:pl-9 
                     pr-16 sm:pr-20 md:pr-28
                     py-1.5 sm:py-2 
                     text-xs sm:text-sm md:text-base 
                     text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-purple-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <div className="absolute right-1 top-1 bottom-1 flex gap-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-200 text-gray-700 rounded-md 
                         px-1.5 sm:px-2 md:px-3 
                         text-[10px] sm:text-xs md:text-sm 
                         hover:bg-gray-300 
                         transition-colors 
                         whitespace-nowrap
                         flex items-center justify-center"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white rounded-md 
                       px-1.5 sm:px-2 md:px-4 
                       text-[10px] sm:text-xs md:text-sm 
                       hover:bg-purple-700 
                       disabled:bg-purple-300 
                       transition-colors 
                       whitespace-nowrap
                       flex items-center justify-center
                       min-w-[40px] sm:min-w-[50px]"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>
      </form>
      
      {error && (
        <p className="mt-2 text-xs sm:text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};