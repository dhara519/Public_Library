import { createSlice } from "@reduxjs/toolkit";
import { bookBuddyApi } from "../../api/bookBuddyApi";

const loginApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  window.sessionStorage.setItem("Token", payload.token);
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(bookBuddyApi.endpoints.login.matchFulfilled, storeToken);
  },
});

export default loginSlice.reducer;
export const { useLoginMutation } = loginApi;
