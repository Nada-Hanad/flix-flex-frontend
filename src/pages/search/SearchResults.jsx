import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MediaGrid from "../../components/shared/itemsGrid";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

export default function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          query: searchQuery,
        },
      });

      const searchResultsData = response.data.results;

      // Update the state with the fetched search results
      setSearchResults(searchResultsData);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching search results. Please try again later.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Search Results
      </h2>
      <MediaGrid media={searchResults} posterBaseUrl={POSTER_BASE_URL} />
    </div>
  );
}
