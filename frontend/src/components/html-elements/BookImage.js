import React, { useState } from 'react';

function BookImage({ book }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = (e) => {
        // Set error state when the image fails to load
        setImageError(true);
        e.target.src = '/default-book.png'; // Fallback image
    };

    const handleImageLoad = () => {
        // Set loaded state when image is successfully loaded
        setImageLoaded(true);
    };
    
    return (
        <div className="libro-photo">
            <img 
            src={book.photo || '/default-book.png'} 
            alt={book.title || 'Default book cover'}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{
                display: imageError ? 'none' : 'block', // Hide image if there's an error
                opacity: imageLoaded ? 1 : 0, // Fade in once image is loaded
                transition: 'opacity 0.3s ease', // Smooth fade-in effect
            }}
            />
            {!imageLoaded && <p>Loading image...</p>} {/* Show loading text if image fails */}
        </div>
    );
}

export default BookImage;