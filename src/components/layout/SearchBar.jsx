import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      return; // Prevent empty search query submission
    }

    // Redirect the user to the search results page with the search query as a URL parameter
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies and series..."
        className="bg-gray-800 text-white rounded-md px-3 py-1 focus:outline-none"
      />
      <button
        type="submit"
        className="ml-2 bg-accentColor text-white bg-accentText hover:bg-yellow-600 rounded-md px-3 py-1"
      >
        Search
      </button>
    </form>
  );
}
