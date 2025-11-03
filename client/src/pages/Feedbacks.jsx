import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Skeleton from "@mui/material/Skeleton";
import "./Feedbacks.css";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Feedbacks = () => {
  const { workId } = useParams();
  const bookId = `/works/${workId}`;
  const [book, setBook] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(-1);
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
        console.error("❌ Error fetching book:", err);
      }
    };
    fetchBook();
  }, [bookId]);

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/feedbacks${bookId}`);
        if (!res.ok) throw new Error("Feedback fetch failed");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("❌ Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [bookId]);

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/feedbacks${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          rating,
          user:
            JSON.parse(localStorage.getItem("user"))?.username || "Anonymous",
        }),
      });
      if (res.ok) {
        const newFb = await res.json();
        setFeedbacks([...feedbacks, newFb]);
        setComment("");
        setRating(5);
      }
    } catch (err) {
      console.error("❌ Error submitting feedback:", err);
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <Skeleton variant="rectangular" width={300} height={400} />
        <div style={{ marginLeft: 20 }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: "1.5rem", marginBottom: 10 }}
          />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: 250 }} />
          <Skeleton
            variant="rectangular"
            width={300}
            height={100}
            sx={{ marginTop: 10 }}
          />
        </div>
      </div>
    );

  return (
    <div className="feedbacks-container">
      {book && (
        <div className="book-feedbacks">
          {/* LEFT SIDE — BOOK INFO */}
          <div className="book-cover-container">
            <img
              src={book.coverImage}
              alt={book.title}
              className="book-cover"
            />
            <h2 className="book-title">{book.title}</h2>
          </div>

          {/* RIGHT SIDE — FEEDBACKS + FORM */}
          <div className="feedbacks-section">
            <h2>
              Feedbacks <span>({feedbacks.length})</span>
            </h2>

            {/* Feedback List */}
            <div className="feedbacks-list">
              {feedbacks.length === 0 ? (
                <p className="no-feedback">
                  No feedback yet. Be the first to share yours!
                </p>
              ) : (
                feedbacks.map((fb) => (
                  <div key={fb._id} className="feedback-card">
                    <div className="feedback-header">
                      <Rating
                        name="read-only"
                        value={fb.rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <span className="feedback-user">
                        {fb.user || "Anonymous"}
                      </span>
                    </div>
                    <p>{fb.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Feedback Form */}
            <div className="feedback-form">
              <h3>Add Your Feedback</h3>
              <form onSubmit={handleSubmit}>
                <label>Your Comment:</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows="3"
                  placeholder="Share your thoughts about this book..."
                />

                <label>Rating:</label>
                <div className="rating-input">
                  <Rating
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    onChange={(event, newValue) => setRating(newValue)}
                    onChangeActive={(event, newHover) => setHover(newHover)}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {rating !== null && (
                    <span className="rating-label">
                      {labels[hover !== -1 ? hover : rating]}
                    </span>
                  )}
                </div>

                <button type="submit" className="submit-btn">
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
