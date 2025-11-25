import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { jwtDecode } from "jwt-decode";
import "./styles/Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("programming");

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded ? decoded.id : null;

  // Load books from OpenLibrary
  async function loadBooks(search) {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}`
      );
      const data = await res.json();

      const docs = Array.isArray(data.docs) ? data.docs : [];

      const formattedBooks = docs.slice(0, 30).map((item) => ({
        key: item.key,
        title: item.title,
        author: item.author_name ? item.author_name[0] : "Unknown",
        cover: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
          : "https://via.placeholder.com/150?text=No+Cover",
      }));

      setBooks(formattedBooks);
    } catch (err) {
      console.error("Error loading books:", err);
      setBooks([]);
    }
  }

  useEffect(() => {
    loadBooks(query);
  });

  // Load favorites from backend
  useEffect(() => {
    if (!token || !userId) return;

    async function loadFavorites() {
      const res = await fetch(`http://localhost:5000/api/favorites/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setFavorites(data.map((f) => f.bookKey));
    }

    loadFavorites();
  }, [token, userId]);

  // Add/remove favorite
  async function toggleFavorite(bookKey) {
    if (!token) {
      alert("Please login to add favorites");
      return;
    }

    const isFav = favorites.includes(bookKey);
    const book = books.find((b) => b.key === bookKey);

    if (!book) return;

    if (isFav) {
      await fetch("http://localhost:5000/api/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, bookKey }),
      });

      setFavorites((prev) => prev.filter((key) => key !== bookKey));
    } else {
      await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          bookKey: book.key,
          title: book.title,
          author: book.author,
          cover: book.cover,
        }),
      });

      setFavorites((prev) => [...prev, bookKey]);
    }
  }

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);
    loadBooks(value);
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <div className="books-page">
        <div className="search-container">
          <div className="group">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 015.29 13.71l5 5-1.42 1.42-5-5A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
            </svg>

            <input
              className="input"
              type="text"
              placeholder="Search books..."
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={favorites.includes(book.key)}
              toggleFavorite={() => toggleFavorite(book.key)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
