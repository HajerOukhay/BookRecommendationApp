import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="navbar">
      {/* LOGO */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          📚 Book Recommendations
        </Link>
      </div>

      {/* USER SECTION */}
      <div className="navbar-right">
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
            <Link to="/login" className="login">
              Login
            </Link>
            <span>/</span>
            <Link to="/register" className="register">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
