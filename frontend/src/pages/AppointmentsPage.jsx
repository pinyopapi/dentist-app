import { useEvents } from "../hooks/useEvents";
import { useBooking } from "../hooks/useBooking";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { AppointmentCalendar } from "../components/AppointmentCalendar";
import { toast } from "react-toastify";

const AppointmentsPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { bookEvent } = useBooking(refreshEvents);
  const { googleToken, googleName, error: loginError, login } = useGoogleAuth();

  const handleSelectEvent = (event) => {
    if (!event.title.toLowerCase().includes("free slot")) {
      toast.error("This slot is already booked!");
      return;
    }
    if (!googleToken) {
      toast.warning("Please log in with Google first to book a slot.");
      return;
    }

    bookEvent({
      eventId: event.id,
      bookedBy: googleName,
      userToken: googleToken,
      eventStart: event.start,
    });
  };

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Appointments</h1>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {!googleToken && (
        <button onClick={() => login()}>Login with Google to book slots</button>
      )}
      <AppointmentCalendar events={events} onSelectEvent={handleSelectEvent} showBookedBy={false} />
    </div>
  );
};

export default AppointmentsPage;