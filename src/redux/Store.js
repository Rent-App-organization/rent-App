// redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import rentalReducer from "./rentalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rentals: rentalReducer,
  }
})

export default store
