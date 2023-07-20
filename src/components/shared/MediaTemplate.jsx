import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaGrid from "./itemsGrid";
import Carousel from "./Carousel";
import { CircularProgress } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

export default function MediaPage({ isMoviesPage }) {
  const [media, setMedia] = useState([]);
  const [popularMedia, setPopularMedia] = useState([]);
  const [actionMedia, setActionMedia] = useState([]);
  const [comedyMedia, setComedyMedia] = useState([]);
  const [romanceMedia, setRomanceMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mediaType = isMoviesPage ? "movie" : "tv";

  useEffect(() => {
    fetchData();
    fetchPopularMedia();
    fetchMediaByCategory("action");
    fetchMediaByCategory("comedy");
    fetchMediaByCategory("romance");
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${mediaType}/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });

      setMedia(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setError(`Error fetching ${mediaType} media. Please try again later.`);
      setIsLoading(false);
    }
  };

  const fetchPopularMedia = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${mediaType}/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: 1,
        },
      });

      setPopularMedia(response.data.results.slice(0, 10));
    } catch (error) {
      setError(`Error fetching popular ${mediaType}. Please try again later.`);
    }
  };

  const fetchMediaByCategory = async (category) => {
    try {
      const genreId = getCategoryGenreId(category);
      const response = await axios.get(
        `${API_BASE_URL}/discover/${mediaType}`,
        {
          params: {
            api_key: API_KEY,
            language: "en-US",
            sort_by: "popularity.desc",
            with_genres: genreId,
            page: 1,
          },
        }
      );

      const categoryMedia = response.data.results.slice(0, 10);

      if (category === "action") {
        setActionMedia(categoryMedia);
      } else if (category === "comedy") {
        setComedyMedia(categoryMedia);
      } else if (category === "romance") {
        setRomanceMedia(categoryMedia);
      }
    } catch (error) {
      setError(
        `Error fetching ${category} ${mediaType}. Please try again later.`
      );
    }
  };

  const getCategoryGenreId = (category) => {
    // Map category names to genre IDs
    const genreMap = {
      action: 28,
      comedy: 35,
      romance: 10749,
    };

    return genreMap[category];
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
        <CircularProgress color="warning" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="text-7xl font-bold text-center mb-8 text-white">
        {isMoviesPage ? "Movies" : "Series"}
      </h2>
      <MediaGrid
        media={media}
        mediaType={mediaType}
        posterBaseUrl={POSTER_BASE_URL}
      />

      <Carousel
        title={isMoviesPage ? "Popular Movies" : "Popular Series"}
        items={popularMedia.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          poster: `${POSTER_BASE_URL}${item.poster_path}`,
          rating: item.vote_average,
        }))}
        isMovieSection={isMoviesPage}
      />

      <Carousel
        title="Action"
        items={actionMedia.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          poster: `${POSTER_BASE_URL}${item.poster_path}`,
          rating: item.vote_average,
        }))}
        isMovieSection={isMoviesPage}
      />

      <Carousel
        title="Comedy"
        items={comedyMedia.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          poster: `${POSTER_BASE_URL}${item.poster_path}`,
          rating: item.vote_average,
        }))}
        isMovieSection={isMoviesPage}
      />

      <Carousel
        title="Romance"
        items={romanceMedia.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          poster: `${POSTER_BASE_URL}${item.poster_path}`,
          rating: item.vote_average,
        }))}
        isMovieSection={isMoviesPage}
      />
    </div>
  );
}
