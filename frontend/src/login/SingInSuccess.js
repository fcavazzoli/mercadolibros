import React from "react"
import '../css/App.css'; 

function Login() {
    const goBack = async (e) => {
        e.preventDefault();
        window.location.replace('');
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