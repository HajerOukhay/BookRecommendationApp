import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import Books from "./pages/Books";
import Feedbacks from "./pages/Feedbacks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

function App() {
  const [user, setUser] = useState(null);

  // Load user info from localStorage when app starts
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div>
        {/* ─────────── HEADER ─────────── */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h2 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#222",
                fontWeight: "bold",
              }}
            >
              📚 BookVerse
            </Link>
          </h2>

          <nav style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {user ? (
              <>
                <span
                  style={{
                    fontWeight: 500,
                    color: "#333",
                    backgroundColor: "#f2f4f8",
                    padding: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  👋 Welcome, <strong>{user.username}</strong>
                </span>

                <Tooltip title="Logout">
                  <LogoutIcon
                    onClick={handleLogout}
                    sx={{
                      cursor: "pointer",
                      color: "#e63946",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "500",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "500",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>

        {/* ─────────── ROUTES ─────────── */}
        <main style={{ padding: "0px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />

            <Route
              path="/books"
              element={<ProtectedRoute element={<Books />} />}
            />
            <Route
              path="/feedbacks/works/:workId"
              element={<ProtectedRoute element={<Feedbacks />} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
