import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, interval);
    return () => clearInterval(autoSlide);
  }, [currentIndex, interval]);

  return (
    <div className="relative w-full max-h-[85vh] mx-auto overflow-hidden shadow-2xl border border-gray-300">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-6 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-6 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &#10095;
      </button>

    </div>
  );
};

export default ImageSlider;
