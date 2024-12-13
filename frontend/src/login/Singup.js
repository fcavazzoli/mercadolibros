import React, { useState } from "react"
import '../css/App.css'; 
import { login } from "../services/userService";
import { Backend } from "../services/backend";
import Global from "./Global"

const backend = new Backend();

function Singup({ onSuccess }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== password2) {
            setError("*Passwords do not match");
            return;  // Stop form submission
        }

        try {
            const data = await backend.post("users/",  { name, email, password });

            const token = await login({ email, password });
            localStorage.setItem('sessionToken', token);
            
            onSuccess();
        } catch (err) {
            setError("*Invalid email or password. Please try again. Error: "+err);
        }
    };

    return (
        <Global>
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>

                <div className="form-group">
                    <label>Confirm password:</label>
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
        </Global>
    );
};

export default Singup;