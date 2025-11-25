import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./styles/Feedbacks.css";

function Feedbacks({ user, setUser }) {
  const { workId } = useParams();
  const bookId = `/works/${workId}`;

  const [book, setBook] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Charger les détails du livre depuis OpenLibrary
  useEffect(() => {
    fetch(`https://openlibrary.org${bookId}.json`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [bookId]);

  // Charger les feedbacks depuis le backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/feedbacks/works/${workId}`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, [workId]);

  // Ajouter un nouveau feedback
  const handleAddFeedback = async () => {
    if (!newComment || newRating === 0) {
      return alert("Veuillez ajouter un commentaire et une note.");
    }

    const feedbackData = {
      user: user.username,
      comment: newComment,
      rating: newRating,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/feedbacks/works/${workId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackData),
        }
      );

      const savedFeedback = await res.json();

      // Mettre à jour la liste localement pour affichage immédiat
      setFeedbacks([savedFeedback, ...feedbacks]);
      setNewComment("");
      setNewRating(0);
      setHover(0);
    } catch (err) {
      console.error("Error saving feedback:", err);
      alert("Erreur lors de l'enregistrement du commentaire.");
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <div className="feedbacks-container">
        <div className="book-details">
          <img
            src={
              book.covers
                ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
                : "/no-cover.png"
            }
            alt={book.title}
            className="book-image"
          />
          <h2>{book.title}</h2>
        </div>

        <div className="feedbacks-section">
          <h3>Commentaires</h3>
          <div className="feedbacks-list">
            {feedbacks.length === 0 && <p>Aucun commentaire pour le moment.</p>}
            {feedbacks.map((f) => (
              <div key={f._id} className="feedback-card">
                <div className="feedback-header">
                  <span className="username">{f.user}</span>
                  <span className="rating">{"⭐".repeat(f.rating)}</span>
                </div>
                <p>{f.comment}</p>
              </div>
            ))}
          </div>

          <div className="add-feedback">
            <h4>Ajouter un feedback</h4>
            <textarea
              placeholder="Votre commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="star"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  {(hover || newRating) >= star ? "⭐" : "☆"}
                </span>
              ))}
            </div>
            <button onClick={handleAddFeedback}>Envoyer</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedbacks;
