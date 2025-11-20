import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import "./styles/Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded ? decoded.id : null;

  useEffect(() => {
    if (!token || !userId) return;

    async function loadFavorites() {
      const res = await fetch(`http://localhost:5000/api/favorites/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setFavorites(data);
    }

    loadFavorites();
  }, [token, userId]);

  async function handleRemove(bookKey) {
    await fetch("http://localhost:5000/api/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, bookKey }),
    });

    setFavorites((prev) => prev.filter((b) => b.bookKey !== bookKey));
  }

  return (
    <>
      <Navbar />

      <div className="favorites-page">
        <h1>❤️ Your Favorite Books</h1>

        {favorites.length === 0 ? (
          <p>No favorite books yet.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((book) => (
              <div key={book.bookKey} className="favorite-card">
                <img src={book.cover} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>

                <button onClick={() => handleRemove(book.bookKey)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
