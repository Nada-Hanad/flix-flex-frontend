import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-darkBlue text-white py-16 bg-cover bg-center flex justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to FlixFlex
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Discover the latest movies and TV series at your fingertips.
          </p>
          <a
            href="/register"
            className="bg-accentText hover:bg-yellow-600 text-white py-3 px-6 rounded-md text-lg font-semibold inline-block"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
