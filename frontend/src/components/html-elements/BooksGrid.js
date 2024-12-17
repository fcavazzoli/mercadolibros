import React from 'react';
import BookImage from './BookImage';

function BooksGrid({ titleClass, title, books, children }) {
    // Check if books is valid and has content

    const hasBooks = Array.isArray(books) && books.length > 0;

    return (<> {hasBooks && (
        <div>
            <h2 className={"content-title " + titleClass}>{title}</h2>
            <div className="books-grid">
                {books.map((book, index) => (
                <div key={book.id || index} className="book-card">
                    {/* Custom BookImage component */}
                    <BookImage book={book} />

                    {/* Book information */}
                    <div className="book-info">
                        <h3 className="book-title">
                            {book.title || 'Título no disponible'}
                        </h3>
                        <p className="book-detail">
                            Autor: {book.author || 'Autor desconocido'}
                        </p>
                    </div>

                    {/* Render children with additional props */}
                    <div className="book-actions">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, { index: index })
                        )}
                    </div>
                </div>
                ))}
            </div>
        </div>
    )}</>);
}

export default BooksGrid;