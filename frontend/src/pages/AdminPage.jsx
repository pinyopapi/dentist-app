import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "../hooks/useEvents";
import { useAdminActions } from "../hooks/useAdminActions";

const localizer = momentLocalizer(moment);

const AdminPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { createSlot, deleteEvent } = useAdminActions(refreshEvents);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleCreateSlot = (e) => {
    e.preventDefault();
    createSlot(start, end);
    setStart("");
    setEnd("");
  };

  const handleSelectEvent = (event) => {
    const msg = event.bookedBy
      ? `Booked by: ${event.bookedBy}`
      : "This is a free slot.";

    if (window.confirm(`${msg}\n\nDelete this event?`)) {
      deleteEvent(event.id);
    }
  };

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
            backgroundColor: event.bookedBy ? "red" : "green",
            color: "white",
          },
        })}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default AdminPage;