import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikeButton from "../../components/buttons/LikeButton";
import { CircularProgress } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const POSTER_BASE_URL = import.meta.env.VITE_POSTER_BASE_URL;

const SeriesDetails = () => {
  const [seriesDetails, setSeriesDetails] = useState(null);
  const { seriesId } = useParams();

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tv/${seriesId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setSeriesDetails(response.data);
      } catch (error) {
        console.error("Error fetching series details:", error);
      }
    };

    fetchSeriesDetails();
  }, [seriesId]);

  if (!seriesDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="warning" />
      </div>
    );
  }

  const {
    name,
    poster_path,
    overview,
    first_air_date,
    episode_run_time,
    vote_average,
    genres,
  } = seriesDetails;

  return (
    <div className="flex flex-col items-center justify-center w-full  p-4 text-white gap-10">
      <div className="flex items-center justify-center gap-10">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <LikeButton isMovie={true} mediaId={seriesId} />
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
            alt={name}
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
            <span className="font-semibold">First Air Date:</span>{" "}
            {first_air_date}
          </div>
          <div className="mt-2">
            <span className="font-semibold">Episode Runtime:</span>
            {episode_run_time} mins
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

export default SeriesDetails;
