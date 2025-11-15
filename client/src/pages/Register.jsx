import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import RegisterImage from "../assets/register-image.png";

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Appel API pour créer un utilisateur
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Le backend retourne { message, user: { username, email, _id, ... } }
        const newUser = {
          username: data.user.username,
          email: data.user.email,
        };

        console.log("✅ Utilisateur enregistré:", newUser);

        // Sauvegarder dans localStorage
        localStorage.setItem("user", JSON.stringify(newUser));

        // Mettre à jour l'état dans App.jsx
        setUser(newUser);

        // Rediriger vers la page des livres
        navigate("/books");
      } else {
        setError(data.error || data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      {/* Formulaire à gauche */}
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <p id="heading">Register</p>

          {error && <div className="error-message">{error}</div>}

          <div className="field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="btn">
            <button className="button1" type="submit">
              Register
            </button>
            <button
              className="button2"
              type="button"
              onClick={handleLoginRedirect}
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Image à droite */}
      <div className="image-wrapper">
        <img src={RegisterImage} alt="Books" />
      </div>
    </div>
  );
}

export default Register;
