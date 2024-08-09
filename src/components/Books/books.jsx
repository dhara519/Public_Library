import { useGetAllBooksQuery } from "./booksSlice";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function Books() {
  const { data, isSuccess } = useGetAllBooksQuery();
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (isSuccess && data) {
      const temp = JSON.parse(data);
      setBooks(temp.books);
    }
  }, [data, isSuccess]);

  const handleSearch = useCallback(() => {
    if (!searchInput) {
      return books;
    }
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [books, searchInput]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const booksToRender = handleSearch();

  return (
    <div>
      <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleChange}
          aria-label="Search"
        />
      </form>
      <div className="books">
        {isSuccess &&
          booksToRender.map((book) => (
            <div key={book.id}>
              <Link to={`/${book.id}`} className="book-link">
                <div className="book-card">
                  <div className="book-image-container">
                    <img
                      className="book-image"
                      src={book.coverimage}
                      alt={book.title}
                    />
                  </div>
                  <div className="book-details">
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{`Status: ${
                      book.available ? "Available" : "Unavailable"
                    }`}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
