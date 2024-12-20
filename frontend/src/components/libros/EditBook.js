import '../../css/App.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../../services/LibroService';
import Header from '../Header';
import usePopup from '../html-elements/usePopup';

const EditBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Ficción');
    const [photo, setPhoto] = useState(''); // Ruta de la foto
    const [preview, setPreview] = useState(''); // Vista previa de la imagen
    const [PopupComponent, showPopup] = usePopup();

    // Cargar los datos del libro al montar el componente
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(bookId);
    
                setTitle(book.title || '');
                setAuthor(book.author || '');
                setCategory(Array.isArray(book.categories) && book.categories.length > 0 ? book.categories[0] : 'Ficción');
                setPhoto(book.photo || '');
    
                // Si hay una foto existente, se genera la ruta completa
                setPreview(book.photo ? book.photo : '');
            } catch (error) {
                console.error('Error al cargar el libro:', error);
                showPopup({message: 'No se pudo cargar la información del libro.'});
            }
        };
        fetchBook();
    }, [bookId]);

    // Manejar la actualización del libro
    const handleUpdateBook = async (e) => {
        e.preventDefault();
        try {
            // Actualizar los datos del libro en el backend
            await updateBook(bookId, { title, author, categories: [category], photo });
            showPopup({message: 'Libro actualizado correctamente', onComplete:() => navigate('/books')});
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
            showPopup({message: 'Error al actualizar el libro. Intente nuevamente más tarde.'});
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file); // Guardamos el archivo en el estado
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setPreview(reader.result); // URL de vista previa temporal
            };
    
            reader.readAsDataURL(file);
        }
    };
    

    // Manejar la cancelación
    const handleCancel = () => {
        navigate('/books'); // Redirige al listado de libros
    };
    debugger;
    return (
        <Header>
            <div className="edit-form-container"> {/* Cambié la clase al contenedor principal */}
                <h2>Modificar Libro</h2>
                <form onSubmit={handleUpdateBook}>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
    
                    <label>Autor:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
    
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Ficción">Ficción</option>
                        <option value="No Ficción">No Ficción</option>
                        <option value="Ciencia Ficción">Ciencia Ficción</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Historia">Historia</option>
                        <option value="Matemática">Matemática</option>
                        <option value="Física">Física</option>
                        <option value="Biografía">Biografía</option>
                        <option value="Romance">Romance</option>
                        <option value="Misterio">Misterio</option>

                    </select>
                    
                    <label>Foto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    {preview && (
                        <div className="image-preview">
                            <p>Vista previa de la imagen:</p>
                            <img
                                src={preview}
                                alt="Vista previa"
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                            />
                        </div>
                    )}
    
                    <div className="form-buttons">
                        <button type="submit" className="save-btn">
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
            {PopupComponent}
        </Header>
    );
};

export default EditBook;