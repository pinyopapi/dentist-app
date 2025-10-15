import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AdminPage = () => {
  const [summary, setSummary] = useState("Free Slot");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/calendar/events");
      const data = await res.json();

      const formatted = data.map((e) => ({
        id: e.id,
        title: e.summary,
        start: new Date(e.start),
        end: new Date(e.end),
      }));

      setEvents(formatted);
    } catch (err) {
      console.error("Error fetching events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    if (!start || !end) {
      alert("Please select start and end time");
      return;
    }

    try {
      const res = await fetch("/calendar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, start, end }),
      });

      if (!res.ok) throw new Error("Failed to create slot");

      alert("Free slot created!");
      setStart("");
      setEnd("");
      fetchEvents();
    } catch (err) {
      console.error("Error creating slot:", err);
      alert("Could not create free slot");
    }
  };

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div>
      <h1>Admin: Manage Calendar</h1>

      <form onSubmit={handleCreateSlot} style={{ marginBottom: 20 }}>
        <label>
          Start:
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: 10 }}>
          End:
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <button type="submit" style={{ marginLeft: 10 }}>
          Create Free Slot
        </button>
      </form>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.title.toLowerCase().includes("free")
              ? "green"
              : "red",
            color: "white",
          },
        })}
      />
    </div>
  );
};

export default AdminPage;