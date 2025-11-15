import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import loginImage from "../assets/login-image.png";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const loggedUser = { username: formData.username };

    localStorage.setItem("user", JSON.stringify(loggedUser));

    setUser(loggedUser);

    navigate("/books");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleLogin}>
          <p id="heading">Login</p>

          <div className="field">
            <input
              name="username"
              className="input-field"
              placeholder="Username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              name="password"
              className="input-field"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn">
            <button type="submit" className="button1">
              Login
            </button>
            <button type="button" className="button2" onClick={handleSignup}>
              Sign Up
            </button>
          </div>

          <button type="button" className="button3">
            Forgot Password
          </button>
        </form>
      </div>

      <div className="image-wrapper">
        <img src={loginImage} alt="Login Illustration" />
      </div>
    </div>
  );
}
