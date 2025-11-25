import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          📚 Book Recommendations
        </Link>
      </div>

      <div className="navbar-right">
        {/* 🔥 Bouton Books affiché si l'utilisateur est connecté */}
        {user && (
          <button className="books-btn" onClick={() => navigate("/books")}>
            📚 Books
          </button>
        )}

        {user ? (
          <div className="user-menu">
            <button
              className="user-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              👤 {user.username} ▾
            </button>

            {menuOpen && (
              <div className="dropdown">
                <button onClick={() => navigate("/favorites")}>
                  ❤️ Favorite Books
                </button>
                <button onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-btn login">
              Login
            </Link>
            <Link to="/register" className="auth-btn register">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
