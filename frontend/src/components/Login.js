import React, { useState } from "react"
import * as server from '../helpers/HttpProtocol'
import '../css/Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await server.post(
                "users/login", 
                { email, password }
            );
        } catch (err) {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="max-height-possible">
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;