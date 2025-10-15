import { useState } from "react";

export const useBooking = (refreshEvents) => {
  const [bookingError, setBookingError] = useState(null);

  const bookEvent = async ({ eventId, bookedBy, userToken, eventStart }) => {
    try {
      const confirmBook = window.confirm(`Book this slot: ${new Date(eventStart).toLocaleString()}?`);
      if (!confirmBook) return false;

      const res = await fetch("/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, bookedBy, userToken }),
      });

      if (!res.ok) throw new Error("Booking failed");

      alert("Slot successfully booked!");
      refreshEvents();
      setBookingError(null);
      return true;
    } catch (err) {
      console.error("Error booking slot:", err);
      setBookingError("Could not book this slot");
      alert("Could not book this slot");
      return false;
    }
  };

  return { bookEvent, bookingError };
};