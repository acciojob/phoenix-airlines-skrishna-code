
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {
    tripType: "one-way",
    source: "",
    destination: "",
    departureDate: "",
    returnDate: ""
  },
  selectedFlight: null,
  passenger: {
    name: "",
    email: "",
    phone: ""
  },
  booking: null
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    updateSearch(state, action) {
      state.search = { ...state.search, ...action.payload };
    },
    setSelectedFlight(state, action) {
      state.selectedFlight = action.payload;
    },
    updatePassenger(state, action) {
      state.passenger = { ...state.passenger, ...action.payload };
    },
    setBooking(state, action) {
      state.booking = action.payload;
    },
    resetBooking(state) {
      state.selectedFlight = null;
      state.passenger = { name: "", email: "", phone: "" };
      state.booking = null;
    }
  }
});

export const {
  updateSearch,
  setSelectedFlight,
  updatePassenger,
  setBooking,
  resetBooking
} = flightSlice.actions;

export default flightSlice.reducer;
