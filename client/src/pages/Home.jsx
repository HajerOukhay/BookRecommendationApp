import React from "react";
import "./styles/Home.css";
import Navbar from "../components/Navbar";

export default function Home({ user, setUser }) {
  return (
    <div className="home-container">
      <Navbar user={user} setUser={setUser} />

      <main className="home-main">
        <h1>Find Books and more !</h1>
        <p>A book recommendation is a whisper from one mind to another</p>
      </main>
    </div>
  );
}
