import React, { useState, useEffect } from 'react';

const CampusTourComponent = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchGalleryImages = async () => {
        try {
            const response = await fetch('https://campuspilot.onrender.com/image-gallary');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGalleryImages(data.map((s) => s.link));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    return (
        <div className='bg-orange-100'>
            <div className='text-4xl text-center font-mono  font-semibold'>Image Gallery</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 py-8 px-24">
                {galleryImages.map((image, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg cursor-pointer hover:shadow-lg"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={() => setSelectedImage(null)}
                >
                    <img src={selectedImage} alt="Selected" className="max-w-full max-h-full rounded-md" />
                </div>
            )}
        </div>
    );
};

export default CampusTourComponent;