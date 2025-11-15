import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./store/favoritesSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
