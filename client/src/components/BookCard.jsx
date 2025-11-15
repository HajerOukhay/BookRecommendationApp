import React from "react";
import FavoriteButton from "../pages/FavoriteButton";
import "./BookCard.css";

function BookCard({ book, isFavorite, toggleFavorite }) {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.cover} alt={book.title} />
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="favorite-overlay">
          <FavoriteButton checked={isFavorite} onToggle={toggleFavorite} />
        </div>
      </div>
    </div>
  );
}

export default BookCard;
