// LibroList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook ,getBooks } from '../../services/LibroService';
import { Backend } from '../../services/backend';

const LibroList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const backend = new Backend();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                console.log(response);
                setBooks(response || []);
            } catch (error) {
                console.error('Error al cargar libros:', error);
                setBooks([]);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                await deleteBook(bookId);
                setBooks(books.filter(book => book.id !== bookId));
                alert('Libro eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
                alert('Error al eliminar el libro. Intente nuevamente más tarde.');
            }
        }
    };

    const handleEdit = (bookId) => {
        navigate(`/edit-book/${bookId}`);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="libro-list-container">
            <h2>Lista de Libros</h2>
            <input
                type="text"
                placeholder="Buscar por título o autor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <span>{book.title} - {book.author}</span>
                        <button onClick={() => handleEdit(book.id)}>Modificar</button>
                        <button onClick={() => handleDelete(book.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LibroList;
