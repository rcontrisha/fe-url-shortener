import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    token: null,
    user: null,
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("[Login]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Sign In");
    }
  },
);

export const registerUser = createAsyncThunk(
  "register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("[Register]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create account.");
    }
  },
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().activeState.active.token;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("[Logout]-Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to Sign Out");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(loginUser, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state, { payload }) => {
        state.isPending = false;
        state.isRejected = false;
        ((state.isFulfilled = true),
          (state.auth.token = payload.results.token),
          (state.auth.user = payload.results.user));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isFulfilled = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(logout, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state) => {
        ((state.isPending = false),
          (state.isFulfilled = true),
          Object.assign(state, initialState));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });

    builder.addAsyncThunk(registerUser, {
      pending: (state) => {
        ((state.isPending = true),
          (state.isFulfilled = false),
          (state.isRejected = false));
      },
      fulfilled: (state) => {
        ((state.isPending = false), (state.isFulfilled = true));
      },
      rejected: (state, { payload }) => {
        ((state.isPending = false),
          (state.isRejected = true),
          (state.error = payload));
      },
    });
  },
});

export default userSlice.reducer;