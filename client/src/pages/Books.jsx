import React, { useEffect, useState } from "react";
import ChromaGrid from "../components/ChromaGrid";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const randomQueries = ["love", "art", "life", "magic", "science", "dream"];
    const randomQuery =
      randomQueries[Math.floor(Math.random() * randomQueries.length)];

    fetch(`http://localhost:5000/api/books/search?q=${randomQuery}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedBooks = data.map((book) => ({
          image:
            book.coverImage ||
            "https://via.placeholder.com/300x400?text=No+Cover",
          title: book.title,
          subtitle: `${book.author} • ${book.firstPublishYear}`,
          handle: book.openLibraryId,
          borderColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
          gradient: `linear-gradient(145deg, hsl(${
            Math.random() * 360
          }, 70%, 60%), hsl(${Math.random() * 360}, 70%, 40%))`,
          url: `https://openlibrary.org${book.openLibraryId}`,
        }));
        setBooks(formattedBooks);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div className="chroma-grid-container">
      <ChromaGrid
        items={books}
        radius={350}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
  );
}
