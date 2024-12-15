import React from "react"
import '../css/App.css'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    const goBack = async (e) => {
        navigate('/');
    };

    return (
        <div className="max-height-possible">
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={goBack}>
                <label>Registrated successfully</label>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default Login;