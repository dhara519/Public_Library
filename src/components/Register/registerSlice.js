import { createSlice } from "@reduxjs/toolkit";
import { bookBuddyApi } from "../../api/bookBuddyApi";

const registerApi = bookBuddyApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/register",
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

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      bookBuddyApi.endpoints.register.matchFulfilled,
      storeToken
    );
  },
});

export default registerSlice.reducer;
export const { useRegisterMutation } = registerApi;
