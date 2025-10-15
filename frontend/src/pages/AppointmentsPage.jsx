import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGoogleLogin } from "@react-oauth/google";

const localizer = momentLocalizer(moment);

const AppointmentsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [googleToken, setGoogleToken] = useState(null);
  const [googleName, setGoogleName] = useState("");

  const fetchEvents = async () => {
    const res = await fetch("/calendar/events");
    const data = await res.json();
    setEvents(
      data.map((e) => ({
        id: e.id,
        title: e.summary,
        start: new Date(e.start),
        end: new Date(e.end),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: async (tokenResponse) => {
      setGoogleToken(tokenResponse.access_token);

      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      ).then((res) => res.json());

      setGoogleName(userInfo.name || userInfo.email);
    },
    onError: () => alert("Google login failed"),
  });

  const handleSelectEvent = async (event) => {
    if (!event.title.toLowerCase().includes("free slot")) {
      alert("This slot is already booked!");
      return;
    }

    if (!googleToken) {
      alert("Please log in with Google first to book a slot.");
      return;
    }

    if (!window.confirm(`Book this slot: ${event.start.toLocaleString()}?`))
      return;

    const res = await fetch("/calendar/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: event.id,
        bookedBy: googleName,
        userToken: googleToken,
      }),
    });

    if (!res.ok) {
      alert("Booking failed");
      return;
    }

    alert("Slot successfully booked!");
    fetchEvents();
  };

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div>
      <h1>Appointments</h1>
      {!googleToken && (
        <button onClick={() => login()}>
          Login with Google to book slots
        </button>
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