import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Feedbacks.css";

function Feedbacks({ user }) {
  const { workId } = useParams();
  const bookId = `/works/${workId}`;
  const [book, setBook] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Charger les détails du livre
  useEffect(() => {
    fetch(`https://openlibrary.org${bookId}.json`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book:", err));
  }, [bookId]);

  // Fonction pour ajouter un nouveau feedback
  const handleAddFeedback = () => {
    if (!newComment || newRating === 0) {
      return alert("Veuillez ajouter un commentaire et une note.");
    }

    const newFeedback = {
      id: Date.now(),
      username: user.username, // prend le vrai username
      comment: newComment,
      rating: newRating,
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setNewComment("");
    setNewRating(0);
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="feedbacks-container">
      {/* Colonne gauche : image + titre */}
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

      {/* Colonne droite : feedbacks + ajout */}
      <div className="feedbacks-section">
        <h3>Commentaires</h3>
        <div className="feedbacks-list">
          {feedbacks.length === 0 && <p>Aucun commentaire pour le moment.</p>}
          {feedbacks.map((f) => (
            <div key={f.id} className="feedback-card">
              <div className="feedback-header">
                <span className="username">{f.username}</span>
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
                className={star <= newRating ? "star selected" : "star"}
                onClick={() => setNewRating(star)}
              >
                ⭐
              </span>
            ))}
          </div>
          <button onClick={handleAddFeedback}>Envoyer</button>
        </div>
      </div>
    </div>
  );
}

export default Feedbacks;
