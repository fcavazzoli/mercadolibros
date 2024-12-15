import React, { useState, useEffect } from 'react';
import './css/Carousel.css';

function Carousel({ children, autoPlay = true, interval = 1000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children); // Total number of items in the carousel

  // Handle next and previous buttons for navigation
  const nextItem = () => {
    setCurrentIndex((index) => (index + 1) % totalItems);
  };

  const prevItem = () => {
    setCurrentIndex((index) => (index - 1 + totalItems) % totalItems);
  };

  // AutoPlay functionality
  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(nextItem, interval);
      return () => clearInterval(timer); // Clear interval on component unmount
    }
  }, [autoPlay, interval]);

  return (
    <div className="carousel-container">
      <div className="carousel-buttons">
        <button onClick={prevItem}>&#10094;</button>
        <button onClick={nextItem}>&#10095;</button>
      </div>

      <div className="carousel-items-container">
        <div
          className="carousel-items"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        > 
          {React.Children.toArray(children).map((child, index) => (
            <div
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;