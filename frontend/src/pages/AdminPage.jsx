import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useAdminActions } from "../hooks/useAdminActions";
import { AppointmentCalendar } from "../components/AppointmentCalendar";

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

      <AppointmentCalendar events={events} onSelectEvent={handleSelectEvent} showBookedBy={true}/>
    </div>
  );
};

export default AdminPage;