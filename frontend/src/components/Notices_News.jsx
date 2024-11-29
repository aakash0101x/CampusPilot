import React, { useState, useEffect } from 'react';

const Notices_News = () => {
  const [notices, setNotices] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  
  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3000/news');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:3000/notice');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchNotices();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="relative font-mono">
      <div className="flex justify-center space-x-8 p-4 px-12 bg-blue-100 rounded-lg shadow-lg">
        <div className="w-1/2 border-2 rounded-md border-blue-500">
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">IIITN Notices</h2>
          <div className="relative h-32 overflow-hidden">
            <div className="ticker">
              {notices.map((notice) => (
                <div
                  key={notice.Not_id}
                  className="ticker-item cursor-pointer h-9 flex items-center justify-center text-gray-700"
                  onClick={() => handleItemClick(notice)}
                >
                  {notice.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/2 border-2 rounded-md border-green-500">
          <h2 className="text-xl font-bold text-center text-green-600 mb-4">IIITN News</h2>
          <div className="relative h-32 overflow-hidden">
            <div className="ticker">
              {news.map((item) => (
                <div
                  key={item.New_id}
                  className="ticker-item cursor-pointer h-9 flex items-center justify-center text-gray-700"
                  onClick={() => handleItemClick(item)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 className="text-lg font-bold mb-2">{selectedItem.title}</h3>
            <p className="text-gray-700">{selectedItem.info}</p>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notices_News;