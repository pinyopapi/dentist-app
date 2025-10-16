import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "../hooks/useTranslation";

export const useAdminActions = (refreshEvents) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getText } = useTranslation();

  const createSlot = async (start, end) => {
    if (!start || !end) return toast.info(getText("createSlotError"));

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

      toast.success(getText("freeSlotCreated"));
      refreshEvents();
    } catch (err) {
      console.error("Error creating slot:", err);
      toast.error(getText("createSlotError"));
      setError(getText("createSlotError"));
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm(getText("confirmDeleteEvent"))) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/calendar/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success(getText("eventDeleted"));
      refreshEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error(getText("deleteSlotError"));
      setError(getText("deleteSlotError"));
    } finally {
      setLoading(false);
    }
  };

  return { createSlot, deleteEvent, loading, error };
};