import React, { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("inception");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/books/search?q=${query}`
        );
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [query]);

  return (
    <div>
      <h2>Books Page</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {books.map((book) => (
          <div
            key={book.openLibraryId}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            <img
              src={book.coverImage || "https://via.placeholder.com/150"}
              alt={book.title}
              style={{ width: "100%" }}
            />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>First published: {book.firstPublishYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
