import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChromaGrid.css";

const ChromaGrid = ({ books = [] }) => {
  const navigate = useNavigate();

  if (!books.length) {
    return <p style={{ textAlign: "center" }}>No books found.</p>;
  }

  return (
    <div className="chroma-grid">
      {books.map((book) => (
        <div
          key={book.key}
          className="chroma-card"
          onClick={() => navigate(`/feedbacks${book.key}`)}
        >
          <img
            src={
              book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                : "https://via.placeholder.com/300x400?text=No+Cover"
            }
            alt={book.title}
            className="chroma-image"
          />
          <div className="chroma-title">{book.title}</div>
        </div>
      ))}
    </div>
  );
};

export default ChromaGrid;
