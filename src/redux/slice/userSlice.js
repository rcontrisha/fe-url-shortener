import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    token: null,
    user: null,
  },
  links: {
    data: [],
    meta: {
      totalActive: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
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
      const token = getState().userState.auth.token;

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

export const fetchUserLinks = createAsyncThunk(
  "fetchUserLinks",
  async ({ search = "", page = 1, limit = 10 } = {}, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.userState.auth?.token;

      const queryParams = new URLSearchParams({ search, page, limit }).toString();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/link/links?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch links.");
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong.");
    }
  }
);

export const deleteShortLink = createAsyncThunk(
  "deleteShortLink",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.authState.auth?.token;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/link/${id}/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to delete link.");
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete link.");
    }
  }
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

    builder.addAsyncThunk(fetchUserLinks, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.isRejected = false;
        state.links.data = payload.data || [];
        state.links.meta = {
          totalActive: payload.meta?.total_active || 0,
          page: payload.meta?.page || 1,
          limit: payload.meta?.limit || 10,
          totalPages: payload.meta?.total_pages || 1,
        };
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.error = payload;
      },
    });

    builder.addAsyncThunk(deleteShortLink, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.isRejected = false;
        state.links.data = state.links.data.filter((item) => item.id !== payload);
        state.links.meta.totalActive = Math.max(0, state.links.meta.totalActive - 1);
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.error = payload;
      },
    });
  },
});

export default userSlice.reducer;