import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteButton from "../pages/FavoriteButton.jsx";
import { addFavorite, removeFavorite } from "../redux/store/favoritesSlice";
import "./BookCard.css";

function BookCard({ book }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.bookKey === book.key);

  const toggleFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add favorites");
      return;
    }

    try {
      if (isFavorite) {
        await fetch(
          `http://localhost:5000/api/favorites/${encodeURIComponent(book.key)}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(removeFavorite(book.key));
      } else {
        await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: "me", // backend peut récupérer depuis le token
            bookKey: book.key,
            title: book.title,
            author: book.author,
            cover: book.cover,
          }),
        });
        dispatch(addFavorite(book));
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
    <div className="book-card">
      <img src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <FavoriteButton checked={isFavorite} onToggle={toggleFavorite} />
    </div>
  );
}

export default BookCard;
