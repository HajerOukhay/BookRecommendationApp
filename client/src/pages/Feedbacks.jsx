import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Feedbacks = () => {
  const { workId } = useParams();
  const bookId = `/works/${workId}`;
  const [book, setBook] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch book info from OpenLibrary
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org${bookId}.json`);
        const data = await res.json();
        setBook({
          title: data.title,
          coverImage: data.covers
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
            : "https://via.placeholder.com/300x400?text=No+Cover",
        });
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };
    fetchBook();
  }, [bookId]);

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/feedbacks${bookId}`);
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [bookId]);

  // Submit new feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/feedbacks${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          rating,
          user: "Anonymous",
        }),
      });
      if (res.ok) {
        const newFb = await res.json();
        setFeedbacks([...feedbacks, newFb]);
        setComment("");
        setRating(5);
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {book && (
        <div className="flex flex-col md:flex-row gap-10">
          {/* Book Cover */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={book.coverImage}
              alt={book.title}
              className="rounded-lg shadow-lg w-72 h-auto"
            />
          </div>

          {/* Right section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              {book.title}
            </h1>

            {/* Feedbacks Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Feedbacks{" "}
                <span className="text-blue-600">({feedbacks.length})</span>
              </h2>

              {feedbacks.length === 0 ? (
                <p className="text-gray-500 italic">
                  No feedback yet. Be the first to share yours!
                </p>
              ) : (
                <div className="space-y-4">
                  {feedbacks.map((fb) => (
                    <div
                      key={fb._id}
                      className="p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-yellow-500 text-lg">
                          {"★".repeat(fb.rating)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {fb.user || "Anonymous"}
                        </span>
                      </div>
                      <p className="text-gray-800">{fb.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Feedback Form */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Add Your Own Feedback
              </h3>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-medium text-gray-700">
                  Your Comment:
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows="3"
                  className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Share your thoughts about this book..."
                />

                <label className="block mb-2 font-medium text-gray-700">
                  Rating (1–5):
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-20 p-2 border rounded-lg mb-4 text-center"
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
