import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useEvents } from "../hooks/useEvents";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const AppointmentsPage = () => {
  const { events, loading, error, refreshEvents } = useEvents();
  const [googleToken, setGoogleToken] = useState(null);
  const [googleName, setGoogleName] = useState("");
  const [loginError, setLoginError] = useState(null);

  const fetchGoogleUserInfo = async (accessToken) => {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user info");
    const data = await res.json();
    return data.name || data.email;
  };

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleToken(tokenResponse.access_token);
        const name = await fetchGoogleUserInfo(tokenResponse.access_token);
        setGoogleName(name);
        setLoginError(null);
      } catch {
        setLoginError("Failed to get user info from Google");
      }
    },
    onError: () => setLoginError("Google login failed"),
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
    if (!window.confirm(`Book this slot: ${event.start.toLocaleString()}?`)) return;

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
      refreshEvents();
    } catch (err) {
      console.error("Error booking slot", err);
      alert("Could not book this slot");
    }
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
