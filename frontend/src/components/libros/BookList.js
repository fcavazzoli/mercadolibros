import React, { useEffect, useState } from 'react';
import { getAllBooks } from "../../services/LibroService";

const BookList = ({ usuarioId }) => {
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const filters = { usuarioId };
                const response = await getAllBooks(filters);
                setLibros(response);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };

        fetchLibros();
    }, [usuarioId]);

    return (
        <div>
            <h1>Mis Libros</h1>
            <ul>
                {libros.map(libro => (
                    <li key={libro.id}>{libro.titulo}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
