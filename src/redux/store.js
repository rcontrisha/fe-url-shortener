import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import userReducer from "./slice/userSlice";

const storage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem: (key) => {
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

const persistUserConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"],
};

const store = configureStore({
  reducer: { 
    userState: persistReducer(persistUserConfig, userReducer)
  },
});

export const persistor = persistStore(store);

export default store;
