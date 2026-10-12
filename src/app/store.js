
import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../features/flight/flightSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer
  }
});
