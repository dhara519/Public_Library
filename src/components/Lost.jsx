import { useNavigate } from "react-router-dom";
import React from "react";

export default function Lost() {
  const navigate = useNavigate();
  return (
    <div className="lost">
      <h1>LOST</h1>
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        Go back...
      </button>
    </div>
  );
}

// REMINDER: I would like to have it so the path to a single book has the specific name/id in the url and have the state of the Navbar update based on login status.
// For some reason my Lost component does not work
