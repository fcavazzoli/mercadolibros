import React, { useState } from 'react';
import BookImage from './BookImage';

function BooksGrid({ title, books }) {
    return (
        <div>
            <h2 className="content-title">{title}</h2>
            <div className="books-grid">
                {books.map((book, index) => (
                <div key={book.id || index} className="book-card">
                    <BookImage book={book} />
                    <div className="book-info">
                        <h3 className="book-title">{book.title || 'Título no disponible'}</h3>
                        <p className="book-detail">Autor: {book.author || 'Autor desconocido'}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default BooksGrid;