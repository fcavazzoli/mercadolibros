import React, { useState } from 'react';

function BookImage({ book }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = (e) => {
        // Set error state when the image fails to load
        setImageError(true);
        e.target.src = '/default-book.png'; // Fallback image
    };

    return (
        <div className="book-photo">
            <img className="book-photo"
            src={book.photo ?? '/default-book.png'}
            alt={book.title ?? 'Default book cover'}
            onError={handleImageError}
            style={{
                display: 'block', // Hide image if there's an error
                transition: 'opacity 0.3s ease', // Smooth fade-in effect
            }}
            />
            
        </div>
    );
}

export default BookImage;