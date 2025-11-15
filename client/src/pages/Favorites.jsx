import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFavorites(data.favorites);
        } else {
          console.error("Failed to load favorites");
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [navigate]);

  const removeFavorite = async (bookKey) => {
    try {
      const token = localStorage.getItem("token");
      const bookKeyEncoded = encodeURIComponent(bookKey);

      await fetch(`http://localhost:5000/api/favorites/${bookKeyEncoded}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites((prev) => prev.filter((fav) => fav.bookKey !== bookKey));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <Navbar />
        <div className="loading">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Navbar />

      <div className="favorites-content">
        <h1>❤️ Your Favorite Books</h1>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <p>No favorite books yet.</p>
            <button onClick={() => navigate("/books")}>Browse Books</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((book) => (
              <div key={book.bookKey} className="favorite-card">
                <div className="favorite-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="favorite-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFavorite(book.bookKey)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
