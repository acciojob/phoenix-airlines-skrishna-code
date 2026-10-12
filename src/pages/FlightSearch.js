
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateSearch,
  setSelectedFlight
} from "../features/flight/flightSlice";

const cities = [
  "Mumbai", "Delhi", "Pune", "Bengaluru",
  "Hyderabad", "Chennai", "Kolkata", "Goa"
];

export default function FlightSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.flight.search);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const change = (e) => {
    dispatch(updateSearch({
      [e.target.name]: e.target.value
    }));
  };

  const searchFlights = (e) => {
    e.preventDefault();

    if (!search.source || !search.destination || !search.departureDate) {
      setError("Please fill in all required fields.");
      return;
    }

    if (search.source === search.destination) {
      setError("Source and destination must be different.");
      return;
    }

    if (
      search.tripType === "round-trip" &&
      (!search.returnDate || search.returnDate < search.departureDate)
    ) {
      setError("Please select a valid return date.");
      return;
    }

    setError("");

    setFlights([
      { id: "PX101", depart: "06:20", arrive: "08:35", price: 4599 },
      { id: "PX205", depart: "10:45", arrive: "13:10", price: 5299 },
      { id: "PX318", depart: "15:30", arrive: "17:40", price: 4899 }
    ]);
  };

  const bookFlight = (flight) => {
    dispatch(setSelectedFlight({
      ...flight,
      source: search.source,
      destination: search.destination,
      date: search.departureDate
    }));

    navigate("/flight-booking");
  };

  return (
    <main className="content-page">
      <h1>Find your next flight</h1>

      <form onSubmit={searchFlights}>
        <label>
          Trip type
          <select
            name="tripType"
            value={search.tripType}
            onChange={change}
          >
            <option value="one-way">One-way</option>
            <option value="round-trip">Round-trip</option>
          </select>
        </label>

        <label>
          From
          <select name="source" value={search.source} onChange={change}>
            <option value="">Select source</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          To
          <select
            name="destination"
            value={search.destination}
            onChange={change}
          >
            <option value="">Select destination</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Departure date
          <input
            type="date"
            name="departureDate"
            value={search.departureDate}
            onChange={change}
            required
          />
        </label>

        {search.tripType === "round-trip" && (
          <label>
            Return date
            <input
              type="date"
              name="returnDate"
              min={search.departureDate}
              value={search.returnDate}
              onChange={change}
              required
            />
          </label>
        )}

        {error && <p role="alert">{error}</p>}

        <button type="submit">Search flights</button>
      </form>

      {flights.map((flight) => (
        <article key={flight.id} className="flight-result">
          <h3>Phoenix Airlines — {flight.id}</h3>
          <p>{search.source} → {search.destination}</p>
          <p>{flight.depart} – {flight.arrive}</p>
          <p>₹{flight.price.toLocaleString("en-IN")}</p>

          <button
            className="book-flight"
            onClick={() => bookFlight(flight)}
          >
            Book flight
          </button>
        </article>
      ))}
    </main>
  );
}
