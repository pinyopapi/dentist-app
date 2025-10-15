import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEvents } from "../hooks/useEvents";
import { useBooking } from "../hooks/useBooking";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const localizer = momentLocalizer(moment);

const AppointmentsPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const { bookEvent } = useBooking(refreshEvents);
  const { googleToken, googleName, error: loginError, login } = useGoogleAuth();

  const handleSelectEvent = (event) => {
    if (!event.title.toLowerCase().includes("free slot")) {
      alert("This slot is already booked!");
      return;
    }
    if (!googleToken) {
      alert("Please log in with Google first to book a slot.");
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
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default AppointmentsPage;