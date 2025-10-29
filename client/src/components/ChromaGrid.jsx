import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import "./ChromaGrid.css";

export const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const navigate = useNavigate(); // 👈 for internal navigation

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  // 👇 navigate to feedbacks page instead of opening a new tab
  const handleCardClick = (book) => {
    if (book && book.handle) {
      navigate(`/feedbacks${book.handle}`);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ "--r": `${radius}px`, "--cols": columns, "--rows": rows }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items?.map((book, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={(e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          }}
          onClick={() => handleCardClick(book)} // 👈 changed
        >
          <div className="chroma-img-wrapper">
            <img src={book.image} alt={book.title} loading="lazy" />
          </div>

          {/* Title and star below image */}
          <div className="chroma-info">
            <span className="title">{book.title}</span>
            <span className="star">★</span>
          </div>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
