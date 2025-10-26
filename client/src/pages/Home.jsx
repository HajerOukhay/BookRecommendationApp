import React from "react";
import Iridescence from "../components/Iridescence";
import ScrollVelocity from "../components/ScrollVelocity";

export default function Home() {
  const velocity = 100;

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Iridescence
        color={[1, 1, 1]}
        mouseReact={true}
        amplitude={0.1}
        speed={1.0}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          textAlign: "center",
          pointerEvents: "none", // allows mouse pass-through if needed
        }}
      >
        <ScrollVelocity
          texts={["Welcome to our BooksRecommendations App !"]}
          velocity={velocity}
          className="custom-scroll-text"
        />
      </div>
    </div>
  );
}
