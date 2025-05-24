import React from 'react';
import { Ticker, ImageSlider, Notices_News } from './components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const App = () => {

  const [SliderImages, setSliderImages] = useState([])

  const fetchSliders = async () => {
    try {
      const response = await fetch('https://campuspilot.onrender.com/slider');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSliderImages(data.map(s => s.imageLink));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchSliders();
  }, []);


  return (
    <div>
      <Ticker />
      <ImageSlider images={SliderImages} interval={4000} />

      <div className="w-full py-10 px-4 flex justify-center linear_grad">
        <div className="w-full max-w-7xl shadow-lg rounded-lg p-8 md:p-12 text-center bg-purple-200">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">About IIITN</h1>
          <p className="text-gray-600 text-lg mb-6">
            Indian Institute of Information Technology, Nagpur (IIITN) is one of the 20 Indian Institutes of Information Technology established under the Public-Private Partnership Scheme by the Ministry of Education (erstwhile Ministry of Human Resource Development), Government of India. IIITN has been declared as an “Institution of National Importance” under the provisions of the Indian Institute of Information Technology (Public-Private Partnership) Act, 2017.
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Explore Our Campus</h2>
          <p className="text-gray-600 text-lg mb-6">
            Take a virtual tour of our campus to experience the facilities, serene environment, and vibrant student life. Our gallery showcases the academic blocks, hostels, sports facilities, and scenic spots that make our campus unique.
          </p>
          <Link
            to="/campus-tour"
            className="inline-block bg-orange-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Take Campus Tour
          </Link>
        </div>
      </div>
      <Notices_News />
      
    </div>
  );
};

export default App;
