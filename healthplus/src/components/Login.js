import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for hardcoded admin credentials
        if (email === "admin@gmail.com" && password === "admin123") {
            navigate("/admin");
            return;
        } 

        const loginData = { email, password };

        try {
            const response = await axios.post("http://localhost:8080/api/users/login", loginData);

            if (response.status === 200) {
                const { name } = response.data; // Extract user name from backend response
                navigate("/home", { state: { userName: name } }); // Pass userName via state
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data || "Invalid login credentials");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="main-background">
            <div className="login-container">
                <Navbar />
                <div className="form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
