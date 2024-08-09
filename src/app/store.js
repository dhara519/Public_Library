import { configureStore } from "@reduxjs/toolkit";
import { bookBuddyApi } from "../api/bookBuddyApi";
import booksReducer from "../components/Books/booksSlice";

const store = configureStore({
  reducer: {
    [bookBuddyApi.reducerPath]: bookBuddyApi.reducer,
    register: booksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookBuddyApi.middleware),
});

export default store;
