import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useAdminActions } from "../hooks/useAdminActions";
import { AppointmentCalendar } from "../components/AppointmentCalendar";
import { useTranslation } from "../hooks/useTranslation";
import ConfirmModal from "../components/ConfirmModal";
import styles from './AdminCalendarPage.module.css';

const AdminCalendarPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { createSlot, deleteEvent } = useAdminActions(refreshEvents);
  const { getText } = useTranslation();

  const [start, setStart] = useState("");
  const [extraMinutes, setExtraMinutes] = useState(30);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleCreateSlot = (e) => {
    e.preventDefault();
    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + extraMinutes * 60000);
    createSlot(startDate.toISOString(), endDate.toISOString());
    setStart("");
  };

  const handleSelectEvent = (event) => {
    setSelectedEventId(event.id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedEventId) await deleteEvent(selectedEventId);
    setConfirmOpen(false);
  };

  if (loading) return <p>{getText("loadingCalendar")}</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{getText("adminManageCalendar")}</h1>

      <form onSubmit={handleCreateSlot} className={styles.formContainer}>
        <div className={styles.labelGroup}>
          <label>{getText("start")}:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <div className={styles.labelGroup}>
          <label>{getText("durationMinutes")}:</label>
          <input
            type="number"
            value={extraMinutes}
            onChange={(e) => setExtraMinutes(e.target.value)}
            min="1"
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          {getText("createFreeSlot")}
        </button>
      </form>

      <div className={styles.calendarWrapper}>
        <AppointmentCalendar
          events={events}
          onSelectEvent={handleSelectEvent}
          showBookedBy={true}
        />
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        messageKey="confirmDeleteEvent"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default AdminCalendarPage;