import { useState } from "react"
import '../css/App.css'; 
import { login } from "../services/userService";
import { useNavigate } from 'react-router-dom';
import Global from './Global'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const token = await login({ email, password });
            localStorage.setItem('sessionToken', token);
            window.location.href = '/';
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <Global>
        <div className="max-height-possible">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
        </Global>
    );
};

export default Login;