import { useState } from "react";
import { toast } from "react-toastify";

export const useBooking = (refreshEvents) => {
  const [bookingError, setBookingError] = useState(null);

  const bookEvent = async ({ eventId, bookedBy, userToken, eventStart }) => {
    try {
      toast.info(`Attempting to book slot: ${new Date(eventStart).toLocaleString()}`);

      const res = await fetch("/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, bookedBy, userToken }),
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success("Slot successfully booked!");
      refreshEvents();
      setBookingError(null);
      return true;
    } catch (err) {
      console.error("Error booking slot:", err);
      toast.error("Could not book this slot");
      setBookingError("Could not book this slot");
      return false;
    }
  };

  return { bookEvent, bookingError };
};