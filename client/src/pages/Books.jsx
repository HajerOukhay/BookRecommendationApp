import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import "./Books.css";

function Books({ user }) {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);

  // Charger les favoris depuis le backend
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          const favMap = {};
          data.favorites.forEach((fav) => {
            favMap[fav.bookKey] = true;
          });
          setFavorites(favMap);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  // Charger les livres
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${query || "programming"}`
        );
        const data = await res.json();

        const formatted = data.docs.slice(0, 30).map((book) => ({
          key: book.key,
          title: book.title,
          author: book.author_name?.[0] || "Unknown author",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "/no-cover.png",
        }));

        setBooks(formatted);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  // Toggle favori
  const toggleFavorite = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add favorites");
      return;
    }

    const isFavorite = favorites[book.key];

    try {
      if (isFavorite) {
        // Supprimer du backend
        const bookKeyEncoded = encodeURIComponent(book.key);
        await fetch(`http://localhost:5000/api/favorites/${bookKeyEncoded}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Supprimer localement
        setFavorites((prev) => {
          const newFav = { ...prev };
          delete newFav[book.key];
          return newFav;
        });
      } else {
        // Ajouter au backend
        await fetch("http://localhost:5000/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookKey: book.key,
            title: book.title,
            author: book.author,
            cover: book.cover,
          }),
        });

        // Ajouter localement
        setFavorites((prev) => ({
          ...prev,
          [book.key]: true,
        }));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorites");
    }
  };

  return (
    <div className="books-page">
      <Navbar />

      <div className="search-container">
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>

          <input
            className="input"
            type="search"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading books...</div>
      ) : (
        <div className="books-grid">
          {books.map((b) => (
            <BookCard
              key={b.key}
              book={b}
              isFavorite={!!favorites[b.key]}
              toggleFavorite={() => toggleFavorite(b)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;
