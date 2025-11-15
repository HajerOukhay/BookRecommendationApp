import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Feedbacks.css";

function Feedbacks() {
  const { workId } = useParams();
  const bookId = `/works/${workId}`;
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://openlibrary.org${bookId}.json`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [bookId]);

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="feedbacks-container">
      <h2>{book.title}</h2>
      <p>
        {book.description
          ? book.description.value || book.description
          : "No description available."}
      </p>
    </div>
  );
}

export default Feedbacks;
