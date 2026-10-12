
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Confirmation() {
  const booking = useSelector((state) => state.flight.booking);

  if (!booking) {
    return <Navigate to="/flight-search" replace />;
  }

  const flight = booking.flight || {};
  const passenger = booking.passenger || {};

  return (
    <main className="content-page">
      <h1>Booking confirmed!</h1>
      <p>Your Phoenix Airlines booking is confirmed.</p>

      <h2>Reference: {booking.bookingReference}</h2>

      <h3>Passenger details</h3>
      <p>Name: {passenger.name}</p>
      <p>Email: {passenger.email}</p>
      <p>Phone: {passenger.phone}</p>

      <h3>Flight details</h3>
      <p>Flight: {flight.id}</p>
      <p>From: {flight.source}</p>
      <p>To: {flight.destination}</p>
      <p>Departure: {flight.date}</p>
      <p>Fare: ₹{flight.price}</p>

      <Link to="/">
        <button type="button">Return to Home</button>
      </Link>
    </main>
  );
}
