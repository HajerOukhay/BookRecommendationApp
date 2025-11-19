import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Auth.css";
import loginImage from "../assets/login-image.png";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // { email, password }
      });

      const data = await res.json();

      if (res.ok) {
        const loggedUser = {
          username: data.user.username,
          email: formData.email,
        };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", data.token);
        setUser(loggedUser);
        navigate("/books");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Une erreur est survenue lors du login");
    } finally {
      setLoading(false);
    }
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
              name="email"
              className="input-field"
              placeholder="Email"
              type="email"
              value={formData.email}
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
            <button type="submit" className="button1" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
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
