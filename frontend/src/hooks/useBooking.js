import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../hooks/useTranslation";

export const useBooking = (refreshEvents) => {
  const [bookingError, setBookingError] = useState(null);
  const { getText } = useTranslation();

  const bookEvent = async ({ eventId, bookedBy, userToken, eventStart }) => {
    try {
      toast.info(`${getText("freeSlot")}: ${new Date(eventStart).toLocaleString()}`);

      const res = await fetch("/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, bookedBy, userToken }),
      });

      if (!res.ok) throw new Error("Booking failed");

      toast.success(getText("slotBookedSuccess"));
      refreshEvents();
      setBookingError(null);
      return true;
    } catch (err) {
      console.error("Error booking slot:", err);
      toast.error(getText("bookingFailed"));
      setBookingError(getText("bookingFailed"));
      return false;
    }
  };

  return { bookEvent, bookingError };
};