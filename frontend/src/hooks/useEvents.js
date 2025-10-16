import { useState, useEffect } from "react";

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/calendar/events");
      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();

      const parsedEvents = data.map(e => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      }));

      setEvents(parsedEvents);
    } catch (err) {
      console.error(err);
      setError("genericError"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  return { events, loading, error, refreshEvents };
};