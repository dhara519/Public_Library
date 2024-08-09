import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Navigations from "./components/Navi";
import Lost from "./components/Lost";
import Register from "./components/Register/register";
import SingleBook from "./components/SingleBook/singleBook";
import Books from "./components/Books/books";
import Login from "./components/Login/login";
import Account from "./components/Accounts/account";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    window.sessionStorage.getItem("Token") ? true : false
  );

  return (
    <>
      <div className="header">
        <h1>Public Library</h1>
      </div>
      <Router>
        <Navigations loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route
            path="/:bookId"
            element={<SingleBook loggedIn={loggedIn} />}
          ></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          ></Route>
          <Route path="*" element={<Lost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
