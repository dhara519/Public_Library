/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
// import { useState } from "react";
import {
  useBorrowBookMutation,
  useGetSingleBookQuery,
} from "./singleBookSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

export default function SingleBook({ loggedIn }) {
  const { bookId } = useParams();
  const { data, isSuccess } = useGetSingleBookQuery(bookId);
  const [book, setBook] = useState([]);

  const [borrowBookMutation, { data: borrowData, isSuccess: borrowSuccess }] =
    useBorrowBookMutation();
  const [borrowedBook, setBorrowedBook] = useState([]);

  useEffect(() => {
    if (isSuccess && data) {
      const temp = JSON.parse(data);
      // console.log(temp.books);
      setBook(temp.book);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (borrowSuccess && borrowData) {
      console.log(borrowData);
      setBorrowedBook(borrowData);
      console.log("This is borrowedBook", borrowedBook);
      window.location.reload();
    }
  }, [borrowData, borrowSuccess, borrowedBook]);

  return (
    <div className="single-book" key={book}>
      <div className="book-image-container">
        <img className="book-image" src={book.coverimage} alt={book.title} />
      </div>
      <div className="single-book-details">
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.description}</p>
        {book.available && loggedIn && (
          <button
            className="borrow-btn"
            value={book.id}
            onClick={() => borrowBookMutation(bookId)}
          >
            Borrow this book
          </button>
        )}
      </div>
    </div>
  );
}
