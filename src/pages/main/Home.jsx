import { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../../components/home/HeroSection";
import Carousel from "../../components/shared/Carousel";
import { CircularProgress } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        popularMoviesResponse,
        popularSeriesResponse,
        actionMoviesResponse,
        comedyMoviesResponse,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
          },
        }),
        axios.get(`${API_BASE_URL}/tv/popular`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
          },
        }),
        axios.get(`${API_BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            sort_by: "popularity.desc",
            with_genres: "28",
            page: 1,
          },
        }),
        axios.get(`${API_BASE_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            sort_by: "popularity.desc",
            with_genres: "35",
            page: 1,
          },
        }),
      ]);

      setPopularMovies(popularMoviesResponse.data.results.slice(0, 10));
      setPopularSeries(popularSeriesResponse.data.results.slice(0, 10));
      setActionMovies(actionMoviesResponse.data.results.slice(0, 10));
      setComedyMovies(comedyMoviesResponse.data.results.slice(0, 10));

      setIsLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
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
        <CircularProgress color="warning" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <HeroSection />
      <Carousel
        title="Popular Movies"
        items={popularMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: `${POSTER_BASE_URL}${movie.poster_path}`,
          rating: movie.vote_average,
        }))}
        isMovieSection={true}
      />
      <Carousel
        title="Popular Series"
        items={popularSeries.map((series) => ({
          id: series.id,
          title: series.name,
          poster: `${POSTER_BASE_URL}${series.poster_path}`,
          rating: series.vote_average,
        }))}
        isMovieSection={false}
      />
      <Carousel
        title="Action Movies"
        items={actionMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: `${POSTER_BASE_URL}${movie.poster_path}`,
          rating: movie.vote_average,
        }))}
        isMovieSection={true}
      />
      <Carousel
        title="Comedy Movies"
        items={comedyMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster: `${POSTER_BASE_URL}${movie.poster_path}`,
          rating: movie.vote_average,
        }))}
        isMovieSection={true}
      />
    </div>
  );
}
