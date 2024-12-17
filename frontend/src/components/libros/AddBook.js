import '../../css/App.css'; 
import React, { useState } from 'react';
import { createBook } from '../../services/LibroService';
import Header from '../Header'
import { useNavigate } from 'react-router-dom';
import usePopup from '../html-elements/usePopup';


const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Ficción');
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(''); // Vista previa de la imagen
    const navigate = useNavigate();
    const [PopupComponent, showPopup] = usePopup();

    const handleAddBook = async (e) => {
        e.preventDefault();        
        const book = await createBook({ title, author, categories: [category], photo })
        console.log('Libro agregado:', book);
        showPopup({message: 'Libro agregado correctamente', onComplete: () => navigate('/books')});
    };

    const handleCancel = () => {
        navigate('/books'); // Redirige a la página de gestión de libros
    };

    const handlePhotoChange = (e) => {
        const fileName = e.target.files[0].name;
        const filePath = `images/${fileName}`;
        setPhoto(filePath);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result); // Muestra la vista previa
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <Header>
            <div className="edit-form-container"> {/* Usamos edit-form-container para estilizar */}
                <h2>Agregar Nuevo Libro</h2>
                <form onSubmit={handleAddBook}>
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
    
                    <label>Categoría:</label>
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
                            <img src={preview} alt="Vista previa" style={{ maxWidth: '200px' }} />
                        </div>
                    )}
    
                    <div className="form-buttons">
                        <button type="submit" className="save-btn">
                            Agregar Libro
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
}

export default AddBook;
