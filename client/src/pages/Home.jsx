import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const goToFavorites = () => {
    navigate("/favorites");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="logo">📚 Book Recommendations</h2>

        <div className="auth-section">
          {user ? (
            <div
              className="user-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="username">
                {user.username} <span className="arrow">▼</span>
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={goToFavorites}>❤️ Favorite Books</button>
                  <button onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
              <button className="signup-btn" onClick={handleSignup}>
                Signup
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="home-main">
        <h1>Find Books and more !</h1>
        <p>A book recommendation is a whisper from one mind to another</p>
      </main>
    </div>
  );
}
