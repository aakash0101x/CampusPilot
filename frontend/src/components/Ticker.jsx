import React from 'react';
import { useState, useEffect } from 'react';
const Ticker = () => {
    const [news, setNews] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchNews = async () => {
        try {
            const response = await fetch('https://campuspilot.onrender.com/news');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNews(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchNews();
    }, []);


    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
    const handleCloseModal = () => {
        setSelectedItem(null);
    };


    return (
        <div className="ticker-container font-semibold flex items-center ">
            <span className="bg-blue-800 z-10 text-white px-4 py-1 mr-4 text-lg font-semibold">
                Announcements
            </span>
            <div className="ticker-content">
                {news.map((item) => (
                    <div
                        key={item.New_id}
                        className="ticker-item cursor-pointer px-4 h-9 flex items-center rounded-md justify-center text-gray-700"
                        onClick={() => handleItemClick(item)}
                    >
                        {item.title}
                    </div>
                ))}
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
                        <p className=" text-gray-700 whitespace-pre-line">{selectedItem.info}</p>
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

export default Ticker;
