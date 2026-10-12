
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FlightSearch from "./pages/FlightSearch";
import FlightBooking from "./pages/FlightBooking";
import Confirmation from "./pages/Confirmation";

export default function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          ✦ PHOENIX AIRLINES
        </Link>

        <nav className="top-nav">
          <Link to="/">Home</Link>
          <Link to="/flight-search">Flights</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>

      <footer className="footer">
        Phoenix Airlines — Explore more. Travel further.
      </footer>
    </div>
  );
}
