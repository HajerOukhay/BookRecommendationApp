import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const workId = book.key.replace("/works/", "");
    navigate(`/feedbacks/${workId}`);
  };

  return (
    <div className="book-card">
      <div
        className="book-cover"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
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
