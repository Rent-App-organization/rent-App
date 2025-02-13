import { configureStore } from "@reduxjs/toolkit";
import rentalReducer from "./rentalSlice";

const store = configureStore({
  reducer: {
    rentals: rentalReducer,
  },
});

export default store;
