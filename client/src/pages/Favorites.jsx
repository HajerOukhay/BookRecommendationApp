import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { setFavorites, removeFavorite } from "../redux/store/favoritesSlice";
import "./styles/Favorites.css";

function Favorites({ user }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  // Load favorites from backend
  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setFavorites(data.favorites || data));
        }
      } catch (err) {
        console.error("Error loading favorites:", err);
      }
    };
    loadFavorites();
  }, [dispatch]);

  const handleRemove = async (bookKey) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(
        `http://localhost:5000/api/favorites/${encodeURIComponent(bookKey)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(removeFavorite(bookKey));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="favorites-page">
      <Navbar user={user} />
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
              <button onClick={() => handleRemove(book.bookKey)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
