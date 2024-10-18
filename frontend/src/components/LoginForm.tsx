import React, { useState } from "react";
import { login } from "../services/authService";
import { LoginCredentials } from "../types/authTypes";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { login: setLoginToken } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const token = await login(credentials);
            setLoginToken(token);
            navigate("/home");
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default LoginForm;
