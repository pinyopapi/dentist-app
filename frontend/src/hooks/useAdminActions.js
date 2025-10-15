import { useState } from "react";

export const useAdminActions = (refreshEvents) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSlot = async (start, end) => {
    if (!start || !end) return alert("Please select start and end time");

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/calendar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: "Free Slot",
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create slot");

      alert("Free slot created!");
      refreshEvents();
    } catch (err) {
      console.error("Error creating slot:", err);
      setError("Failed to create slot");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/calendar/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!res.ok) throw new Error("Delete failed");

      alert("Event deleted");
      refreshEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  return { createSlot, deleteEvent, loading, error };
};