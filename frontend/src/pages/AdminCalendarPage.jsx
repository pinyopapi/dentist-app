import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useAdminActions } from "../hooks/useAdminActions";
import { AppointmentCalendar } from "../components/AppointmentCalendar";
import { useTranslation } from "../hooks/useTranslation";

const AdminCalendarPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { createSlot, deleteEvent } = useAdminActions(refreshEvents);
  const { getText } = useTranslation();

  const [start, setStart] = useState("");
  const [extraMinutes, setExtraMinutes] = useState(30);

  const handleCreateSlot = (e) => {
    e.preventDefault();
    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + extraMinutes * 60000); 
    createSlot(startDate.toISOString(), endDate.toISOString());
    setStart("");
  };

  const handleSelectEvent = (event) => {
    deleteEvent(event.id);
  };

  if (loading) return <p>{getText("loadingCalendar")}</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>{getText("adminManageCalendar")}</h1>

      <form onSubmit={handleCreateSlot} style={{ marginBottom: 20 }}>
        <label>
          {getText("start")}:
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          {getText("durationMinutes")}:
          <input
            type="number"
            value={extraMinutes}
            onChange={(e) => setExtraMinutes(e.target.value)}
            min="1"
          />
        </label>
        <button type="submit">
          {getText("createFreeSlot")}
        </button>
      </form>

      <AppointmentCalendar
        events={events}
        onSelectEvent={handleSelectEvent}
        showBookedBy={true}
      />
    </div>
  );
};

export default AdminCalendarPage;