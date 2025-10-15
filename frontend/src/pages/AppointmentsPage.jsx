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
  const [error, setError] = useState(null);

  const formatEvents = (data) => {
    return data.map((e) => ({
      id: e.id,
      title: e.summary,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/calendar/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(formatEvents(data));
    } catch (err) {
      console.error("Error fetching calendar events", err);
      setError("Could not load calendar events");
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLoginSuccess = async (tokenResponse) => {
    const token = tokenResponse.access_token;
    setGoogleToken(token);

    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userInfo = await res.json();
      setGoogleName(userInfo.name || userInfo.email);
    } catch (err) {
      console.error("Failed to fetch Google user info", err);
    }
  };

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: handleGoogleLoginSuccess,
    onError: () => alert("Google login failed"),
  });

  const validateBooking = (event) => {
    if (!event.title.toLowerCase().includes("free slot")) {
      alert("This slot is already booked!");
      return false;
    }
    if (!googleToken) {
      alert("Please log in with Google first to book a slot.");
      return false;
    }
    return true;
  };

  const confirmBooking = (event) => {
    return window.confirm(`Book this slot: ${event.start.toLocaleString()}?`);
  };

  const bookSlot = async (event) => {
    try {
      const res = await fetch("/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          bookedBy: googleName,
          userToken: googleToken,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      alert("Slot successfully booked!");
      fetchEvents();
    } catch (err) {
      console.error("Error booking slot", err);
      alert("Could not book this slot");
    }
  };

  const handleSelectEvent = async (event) => {
    if (!validateBooking(event)) return;
    if (!confirmBooking(event)) return;
    await bookSlot(event);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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