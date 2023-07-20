import React from "react";
import MovieSeriesItem from "./MovieSeriesItem";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";

export default function MediaGrid({ media, mediaType }) {
  const renderMedia = () => {
    return media.map((item) => (
      <SwiperSlide key={item.id}>
        <MovieSeriesItem
          id={item.id}
          title={item.title || item.name}
          poster={`${import.meta.env.VITE_POSTER_BASE_URL}${item.poster_path}`}
          rating={item.vote_average}
          isMovie={mediaType === "movie"}
        />
      </SwiperSlide>
    ));
  };

  const breakpoints = {
    // When window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // When window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // When window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // When window width is >= 1024px
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  };

  return (
    <div className="px-24">
      {media.length === 0 ? (
        <div className="min-h-screen">
          <p className="text-white text-center my-4">No items to display.</p>
        </div>
      ) : (
        <Swiper
          breakpoints={breakpoints}
          grid={{
            rows: 2,
            fill: "row",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          className="mySwiper"
        >
          {renderMedia()}
        </Swiper>
      )}
    </div>
  );
}
