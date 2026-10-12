
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updatePassenger,
  setBooking
} from "../features/flight/flightSlice";

export default function FlightBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedFlight, passenger } = useSelector(
    (state) => state.flight
  );

  const [error, setError] = useState("");

  if (!selectedFlight) {
    return (
      <main className="content-page">
        <h2>No flight selected</h2>
        <Link to="/flight-search">Search flights</Link>
      </main>
    );
  }

  const change = (e) => {
    dispatch(updatePassenger({
      [e.target.name]: e.target.value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (passenger.name.trim().length < 2) {
      setError("Enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!/^\+?[0-9\s()-]{7,18}$/.test(passenger.phone)) {
      setError("Enter a valid phone number.");
      return;
    }

    const booking = {
      passenger,
      flight: selectedFlight,
      bookingReference: `PX${Date.now().toString().slice(-8)}`,
      status: "Confirmed"
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking)
        }
      );

      if (!response.ok) throw new Error("Booking API error");

      dispatch(setBooking(await response.json()));
    } catch {
      // Demo fallback if the backend is not running.
      dispatch(setBooking(booking));
    }

    navigate("/confirmation");
  };

  return (
    <main className="content-page">
      <h1>Passenger details</h1>

      <form onSubmit={submit}>
        <label>
          Full name
          <input
            type="text"
            name="name"
            value={passenger.name}
            onChange={change}
            required
          />
        </label>

        <label>
          Email
          <input
            type="text"
            name="email"
            value={passenger.email}
            onChange={change}
            required
          />
        </label>

        <label>
          Phone number
          <input
            type="text"
            name="phone"
            value={passenger.phone}
            onChange={change}
            required
          />
        </label>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Confirm booking</button>
      </form>
    </main>
  );
}
