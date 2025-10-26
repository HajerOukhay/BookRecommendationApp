const axios = require("axios");

// Search books from Open Library API
const searchBooks = async (req, res) => {
  console.log("✅ searchBooks route hit");

  try {
    const query = req.query.q;
    console.log("🔍 Query:", query);

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Fetch from Open Library
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    // Extract useful info
    const books = response.data.docs.slice(0, 20).map((book) => ({
      openLibraryId: book.key, // unique ID
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      firstPublishYear: book.first_publish_year || "N/A",
      coverImage: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));
    res.json(books);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { searchBooks };
