import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useAdminActions } from "../hooks/useAdminActions";
import { AppointmentCalendar } from "../components/AppointmentCalendar";
import { useTranslation } from "../hooks/useTranslation";
import ConfirmModal from "../components/ConfirmModal";

const AdminPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { createSlot, deleteEvent } = useAdminActions(refreshEvents);
  const { getText } = useTranslation();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateSlot = (e) => {
    e.preventDefault();
    createSlot(start, end);
    setStart("");
    setEnd("");
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setConfirmOpen(false);
    }
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
        <label style={{ marginLeft: 10 }}>
          {getText("end")}:
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <button type="submit" style={{ marginLeft: 10 }}>
          {getText("createFreeSlot")}
        </button>
      </form>

      <AppointmentCalendar
        events={events}
        onSelectEvent={handleSelectEvent}
        showBookedBy={true}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        messageKey="confirmDeleteEvent"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default AdminPage;