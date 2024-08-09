/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react";
import {
  useGetAccountQuery,
  useGetReservationsQuery,
  useReturnBookMutation,
} from "./accountSlice";

export default function Account() {
  const [user, setUser] = useState({});
  const { data: accountData, isSuccess: accountSuccess } = useGetAccountQuery();
  const [reservations, setReservations] = useState([]);
  const {
    data: reservationsData,
    isSuccess: reservationsSuccess,
    refetch: refetchReservations,
  } = useGetReservationsQuery();

  const [returnedBook, setReturnedBook] = useState({});
  const [
    returnBookMutation,
    { isSuccess: returnSuccess, isError: returnError },
  ] = useReturnBookMutation();

  // Effect to fetch account data on initial render
  useEffect(() => {
    if (accountSuccess && accountData) {
      setUser(accountData);
    }
  }, [accountData, accountSuccess]);

  // Effect to fetch reservations data on initial render and whenever refetched
  useEffect(() => {
    if (reservationsSuccess && reservationsData) {
      setReservations(reservationsData.reservation);
    }
  }, [reservationsData, reservationsSuccess]);

  // Effect to handle book return and refetch reservations on successful return
  useEffect(() => {
    if (returnSuccess && returnedBook) {
      setReturnedBook(returnedBook);

      // After returning a book, refetch reservations
      refetchReservations();
    }
  }, [returnSuccess, returnedBook, refetchReservations]);

  const handleReturnBook = (bookId) => {
    returnBookMutation(bookId);
  };

  return (
    <div className="account">
      <div className="account-details">
        <h2 className="account-header">Account Details</h2>
        <h4>{`Name: ${user.firstname} ${user.lastname}`}</h4>
        <h4>{`Email: ${user.email}`}</h4>
      </div>
      <br />
      <div className="checked-out-books">
        <h2 className="account-header">Reservations</h2>
        {reservations && reservations.length === 0 ? (
          <p>No checked out books...</p>
        ) : (
          <div className="books">
            {reservations.map((book) => (
              <div key={book.id} className="reservation-card">
                <div className="reservation-card">
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
                    {!book.available ? (
                      <button
                        className="return-btn"
                        onClick={() => handleReturnBook(book.id)}
                      >
                        Return Book
                      </button>
                    ) : (
                      <p>Book Returned</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
