import React, { useState, useEffect } from 'react';
import image1 from './images/scrap1.webp';
import image2 from './images/scrap2.jpg';
import image3 from './images/scrap3.jpg';
import image4 from './images/scrap4.jpg';

const images = [image1, image2, image3, image4];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Trigger fade-out effect
      setFade(false);

      // Wait for fade-out to complete, then switch the image
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // Trigger fade-in effect
      }, 1000); // Adjust timing based on the fade duration
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-[100%] h-[100%] overflow-hidden rounded-lg shadow-lg mx-auto">
      <img
        src={images[currentIndex]}
        alt="Slideshow"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${fade ? 'opacity-400' : 'opacity-10'}`}
      />
    </div>
  );
}

export default ImageCarousel;
