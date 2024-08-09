/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Navigations({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    window.sessionStorage.removeItem("Token");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link" href="#">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            {loggedIn && (
              <li className="nav-item">
                <Link to="/account" className="nav-link" href="#">
                  Account
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li className="nav-item">
                <Link to="/login" className="nav-link" href="#">
                  Login
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li className="nav-item">
                <Link to="/register" className="nav-link" href="#">
                  Register
                </Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
