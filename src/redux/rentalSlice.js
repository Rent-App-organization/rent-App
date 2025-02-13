import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch rentals from Firebase
export const fetchRentals = createAsyncThunk(
  "rentals/fetchRentals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://rental-website-bb300-default-rtdb.firebaseio.com/products.json"
      );

      const data = response.data;

      if (!data) return rejectWithValue("No rentals found.");

      // Convert Firebase object to an array with auto-generated ID
      const rentals = Object.entries(data).map(([id, rental]) => ({
        id, // Auto-generated Firebase ID
        ...rental, // Spread rental details
      }));

      // Extract unique categories
      const categories = [...new Set(rentals.map((rental) => rental.category))];

      return { rentals, categories };
    } catch (error) {
      console.error("Fetch rentals error:", error);
      return rejectWithValue(
        "Failed to fetch rentals. Please try again later."
      );
    }
  }
);

const rentalSlice = createSlice({
  name: "rentals",
  initialState: {
    rentals: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = action.payload.rentals;
        state.categories = action.payload.categories;
      })
      .addCase(fetchRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rentalSlice.reducer;
