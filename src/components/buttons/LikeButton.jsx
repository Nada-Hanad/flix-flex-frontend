import { useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Cookies from "js-cookie";

export default function LikeButton({ mediaId, isMovie }) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.error("Error toggling like: Token missing");
        return;
      }

      const headers = {
        Authorization: ` ${token}`,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/users/favorites/${
          isLiked ? "remove" : "add"
        }`,
        {
          [isMovie ? "movieId" : "seriesId"]: mediaId,
        },
        { headers }
      );

      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <button
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100"
      onClick={toggleLike}
    >
      {isLiked ? (
        <FavoriteIcon color="error" />
      ) : (
        <FavoriteBorderIcon color="error" />
      )}
    </button>
  );
}
