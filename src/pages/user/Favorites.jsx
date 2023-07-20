import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import MediaGrid from "../../components/shared/itemsGrid";
import { CircularProgress } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

export default function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteSeries, setFavoriteSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavoriteMedia();
    }
  }, [isLoggedIn]);

  const fetchFavoriteMedia = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/users/favorites`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const { favoriteMoviesIds, favoriteSeriesIds } = response.data;

      const favoriteMoviesRequests = favoriteMoviesIds.map((movieId) =>
        axios.get(`${API_BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        })
      );

      const favoriteSeriesRequests = favoriteSeriesIds.map((seriesId) =>
        axios.get(`${API_BASE_URL}/tv/${seriesId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        })
      );

      const favoriteMoviesResponses = await Promise.all(favoriteMoviesRequests);
      const favoriteSeriesResponses = await Promise.all(favoriteSeriesRequests);

      const favoriteMoviesData = favoriteMoviesResponses.map(
        (response) => response.data
      );

      const favoriteSeriesData = favoriteSeriesResponses.map(
        (response) => response.data
      );

      setFavoriteMovies(favoriteMoviesData);
      setFavoriteSeries(favoriteSeriesData);
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching favorite media. Please try again later.");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-80 flex items-center justify-center">
        <CircularProgress color="warning" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Favorite Movies
      </h2>
      <MediaGrid
        media={favoriteMovies}
        mediaType="movie"
        posterBaseUrl={POSTER_BASE_URL}
      />

      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Favorite Series
      </h2>
      <MediaGrid
        media={favoriteSeries}
        mediaType="tv"
        posterBaseUrl={POSTER_BASE_URL}
      />
    </div>
  );
}
