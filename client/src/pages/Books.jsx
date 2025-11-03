import React, { useEffect, useState } from "react";
import ChromaGrid from "../components/ChromaGrid";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/subjects/fiction.json?limit=12"
        );
        const data = await res.json();
        setBooks(data.works || []); // ✅ ensure array
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]); // ✅ fallback
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Books</h2>
      <ChromaGrid books={books || []} />{" "}
      {/* ✅ Ensure it always gets an array */}
    </div>
  );
};

export default Books;
