import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikeButton from "../../components/buttons/LikeButton";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

const MoviesDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return (
      <div className="p-4 text-white">
        <div className="flex">
          <div className="w-1/3">
            <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex flex-col ml-4 w-2/3">
            <div className="w-36 h-6 bg-gray-300 rounded-md mb-2"></div>
            <div className="flex flex-wrap mt-2">
              <div className="w-20 h-6 bg-gray-300 rounded-md mr-2 mb-2"></div>
              <div className="w-20 h-6 bg-gray-300 rounded-md mr-2 mb-2"></div>
            </div>
            <div className="w-20 h-6 bg-gray-300 rounded-md mt-4"></div>
            <div className="w-36 h-6 bg-gray-300 rounded-md mt-2"></div>
            <div className="w-28 h-6 bg-gray-300 rounded-md mt-2"></div>
            <div className="w-28 h-6 bg-gray-300 rounded-md mt-4"></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
          <div className="mt-2 w-full h-20 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    );
  }

  const {
    title,
    poster_path,
    overview,
    release_date,
    runtime,
    vote_average,
    genres,
  } = movieDetails;

  return (
    <div className="flex flex-col items-center justify-center w-full  p-4 text-white gap-10">
      <div className="flex items-center justify-center gap-10">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <LikeButton isMovie={true} mediaId={movieId} />
      </div>
      <div className="flex flex-wrap mt-2">
        {genres.map((genre) => (
          <span
            key={genre.id}
            className="mr-2 mb-2 text-black bg-gray-300 px-2 py-1 rounded-md text-sm font-semibold"
          >
            {genre.name}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="w-1/3">
          <img
            src={POSTER_BASE_URL + poster_path}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex flex-col w-96">
          <div className="flex items-center mt-4">
            <span className="text-yellow-500 font-semibold text-xl">
              {vote_average}
            </span>
            <span className="ml-1">/10</span>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Release Date:</span> {release_date}
          </div>
          <div className="mt-2">
            <span className="font-semibold">Runtime:</span> {runtime} mins
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-2 w-2/3 ">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
