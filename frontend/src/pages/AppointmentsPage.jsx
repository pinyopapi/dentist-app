import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AppointmentsPage = () => {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Google Calendar OAuth token kérése
  useEffect(() => {
    if (!window.google) return;

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar",
      callback: (resp) => {
        setToken(resp.access_token);
      },
    });

    document.getElementById("calendarAuthBtn").onclick = () => {
      client.requestAccessToken();
    };
  }, []);

  // Események lekérése
  useEffect(() => {
    const loadEvents = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch("/calendar/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const formatted = data.map((e) => ({
          id: e.id,
          title: e.summary,
          start: new Date(e.start.dateTime || e.start.date),
          end: new Date(e.end.dateTime || e.end.date),
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Error fetching calendar events", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [token]);


  // Slot kiválasztása és foglalás
  const handleSelectSlot = async (slotInfo) => {
    if (!token) return alert("Authorize Google Calendar first");
    const summary = prompt("Enter appointment title:", "Dental Checkup");
    if (!summary) return;

    try {
      const res = await fetch("/calendar/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          summary,
          start: slotInfo.start.toISOString(),
          end: slotInfo.end.toISOString(),
        }),
      });
      const newEvent = await res.json();
      setEvents((prev) => [
        ...prev,
        {
          id: newEvent.id,
          title: newEvent.summary,
          start: new Date(newEvent.start.dateTime || newEvent.start.date),
          end: new Date(newEvent.end.dateTime || newEvent.end.date),
        },
      ]);
    } catch (err) {
      console.error("Error creating calendar event", err);
      alert("Failed to book this slot.");
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      <button id="calendarAuthBtn">Authorize Google Calendar</button>
      {loading && <p>Loading calendar...</p>}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default AppointmentsPage;