import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChromaGrid.css";

function ChromaGrid({ books }) {
  const navigate = useNavigate();

  const handleBookClick = (workId) => {
    navigate(`/feedbacks/${workId}`);
  };

  return (
    <div className="chroma-grid">
      {books.map((book) => (
        <div
          key={book.key}
          className="chroma-card"
          onClick={() => handleBookClick(book.key.split("/works/")[1])}
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                : "https://via.placeholder.com/200x300?text=No+Cover"
            }
            alt={book.title}
            className="chroma-image"
          />
          <div className="chroma-info">
            <h3>{book.title}</h3>
            <p>{book.authors?.[0]?.name || "Unknown author"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChromaGrid;
