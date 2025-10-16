import { useEvents } from "../hooks/useEvents";
import { useBooking } from "../hooks/useBooking";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { AppointmentCalendar } from "../components/AppointmentCalendar";
import { toast } from "react-toastify";
import { useTranslation } from "../hooks/useTranslation";

const AppointmentsPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { bookEvent } = useBooking(refreshEvents);
  const { googleToken, googleName, error: loginError, login } = useGoogleAuth();
  const { getText } = useTranslation();

  const handleSelectEvent = (event) => {
    if (!event.title.includes(getText("freeSlot"))) {
      toast.error(getText("slotAlreadyBooked"));
      return;
    }
    if (!googleToken) {
      toast.warning(getText("loginFirstGoogle"));
      return;
    }

    bookEvent({
      eventId: event.id,
      bookedBy: googleName,
      userToken: googleToken,
      eventStart: event.start,
    });
  };

  if (loading) return <p>{getText("loading")}</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>{getText("appointments")}</h1>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {!googleToken && (
        <button onClick={login}>{getText("loginWithGoogle")}</button>
      )}
      <AppointmentCalendar
        events={events}
        onSelectEvent={handleSelectEvent}
        showBookedBy={false}
      />
    </div>
  );
};

export default AppointmentsPage;