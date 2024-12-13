import React, { useState } from 'react';

function BooksGrid({ title, books }) {
    return (
        <div>
        <h2 className="content-title">{title}</h2>
        <div className="books-grid">
        {books.map((book) => (
            <div key={book._id} className="book-card">
            <img
                src={book.photo || '/book-placeholder.png'}
                alt={book.title || 'Imagen no disponible'}
                className="book-image"
            />
            <div className="book-info">
                <h3 className="book-title">{book.title || 'Título no disponible'}</h3>
                <p className="book-author">Autor: {book.author || 'Autor desconocido'}</p>
                <p className="book-condition">Estado: {book.condition || 'No especificado'}</p>
            </div>
            </div>
        ))}
        </div>
        </div>
    );
}

export default BooksGrid;