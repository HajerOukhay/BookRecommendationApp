import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Favorites from "./pages/Favorites";
import Feedbacks from "./pages/Feedbacks";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
      <Route
        path="/books"
        element={user ? <Books user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/favorites"
        element={user ? <Favorites user={user} /> : <Navigate to="/login" />}
      />

      <Route
        path="/feedbacks/:workId"
        element={user ? <Feedbacks user={user} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
