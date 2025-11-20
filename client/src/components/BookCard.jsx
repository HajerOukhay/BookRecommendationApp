import React from "react";
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

        <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorite"}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
