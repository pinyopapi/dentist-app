import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { useBooking } from "../hooks/useBooking";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { AppointmentCalendar } from "../components/AppointmentCalendar";
import { toast } from "react-toastify";
import { useTranslation } from "../hooks/useTranslation";
import ConfirmModal from "../components/ConfirmModal";
import styles from './AppointmentsPage.module.css';

const AppointmentsPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { bookEvent } = useBooking(refreshEvents);
  const { googleToken, googleName, error: loginError, login } = useGoogleAuth();
  const { getText } = useTranslation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    if (!event.title.includes(getText("freeSlot"))) {
      toast.error(getText("slotAlreadyBooked"));
      return;
    }
    if (!googleToken) {
      toast.warning(getText("loginFirstGoogle"));
      return;
    }

    setSelectedEvent(event);
    setConfirmOpen(true);
  };

  const confirmBooking = async () => {
    if (selectedEvent) {
      await bookEvent({
        eventId: selectedEvent.id,
        bookedBy: googleName,
        userToken: googleToken,
        eventStart: selectedEvent.start,
      });
    }
    setConfirmOpen(false);
  };

  if (loading) return <p>{getText("loading")}</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>{getText("appointments")}</h1>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {!googleToken && (
        <div className={styles.googleWrapper}>
          <button className={styles.googleButton} onClick={login}>
            <svg
              className={styles.googleIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
            >
              <path fill="#4285F4" d="M533.5 278.4c0-17.7-1.5-35.2-4.5-52H272v98.7h146.9c-6.3 33.9-25.5 62.8-54.3 82.2v68.1h87.6c51.3-47.3 80.3-116.7 80.3-196.9z" />
              <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.4 180.8-66.4l-87.6-68.1c-24.3 16.3-55.4 26-93.2 26-71.5 0-132-48.3-153.6-113.1H31.7v70.9C76.2 487.6 168.4 544.3 272 544.3z" />
              <path fill="#FBBC05" d="M118.4 329.7c-5.1-15.2-8-31.5-8-48s2.9-32.8 8-48v-70.9H31.7C11.4 224.3 0 245.5 0 272s11.4 47.7 31.7 70.9l86.7-70.9z" />
              <path fill="#EA4335" d="M272 107.7c39.9 0 75.6 13.7 103.8 40.7l77.9-77.9C407.5 23.4 345.6 0 272 0 168.4 0 76.2 56.7 31.7 144.6l86.7 70.9c21.6-64.8 82.1-113.1 153.6-113.1z" />
            </svg>
            {getText("loginWithGoogle")}
          </button>
        </div>
      )}


      <AppointmentCalendar
        events={events}
        onSelectEvent={handleSelectEvent}
        showBookedBy={false}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        messageKey="confirmBooking"
        onConfirm={confirmBooking}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default AppointmentsPage;