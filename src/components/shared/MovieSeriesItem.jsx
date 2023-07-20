import { useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../buttons/LikeButton";
import StarIcon from "@mui/icons-material/Star";

export default function MovieSeriesItem({
  id,
  title,
  poster,
  rating,
  isMovie,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const itemLink = isMovie ? `/movies/${id}` : `/series/${id}`;

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div>
      <div className="absolute top-4 right-4">
        <LikeButton
          isLiked={isLiked}
          isMovie={isMovie}
          toggleLike={toggleLike}
          mediaId={id}
        />
      </div>
      <Link to={itemLink}>
        <div className="w-full bg-darkBlue rounded-lg overflow-hidden shadow-md">
          <img
            src={
              poster.endsWith("null") || poster.endsWith("undefined")
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwORT9DvvkOGSH14bSzA6JAJ53FHb1HwHl21xnbGW5&s"
                : poster
            }
            alt={title}
            className="w-full h-auto mb-2"
          />

          <div className="px-4 py-3">
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <div className="flex items-center mb-2">
              <StarIcon color="warning" />
              <span className="text-white ml-2">{rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
