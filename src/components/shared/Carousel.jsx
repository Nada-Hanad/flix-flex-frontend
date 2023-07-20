import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import MovieSeriesItem from "./MovieSeriesItem";

export default function Carousel({ title, items, isMovieSection }) {
  const sectionLink = isMovieSection ? "/movies" : "/series";

  return (
    <section className="mb-8 w-5/6 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">{title}</h2>
        <Link
          to={sectionLink}
          className="text-accentText hover:text-yellow-600 text-lg font-semibold"
        >
          View All
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          // Responsive breakpoints
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-center items-center"
          >
            <MovieSeriesItem
              id={item.id}
              title={item.title}
              poster={item.poster}
              rating={item.rating}
              isMovie={isMovieSection}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
