import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AppointmentsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/calendar/events");
      const data = await res.json();

      const formatted = data.map((e) => ({
        id: e.id,
        title: e.summary,
        start: new Date(e.start),
        end: new Date(e.end),
      }));

      setEvents(formatted);
    } catch (err) {
      console.error("Error fetching calendar events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectEvent = async (event) => {
    if (!event.title.toLowerCase().includes("free slot")) {
      alert("This slot is already booked!");
      return;
    }

    const confirmBook = window.confirm(
      `Book this slot: ${event.start.toLocaleString()}?`
    );
    if (!confirmBook) return;

    try {
      const res = await fetch("/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          bookedBy: "Client",
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

  const eventStyleGetter = (event) => {
    const isFree = event.title.toLowerCase().includes("free slot");
    const backgroundColor = isFree ? "#34d399" : "#f87171";
    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        color: "white",
        border: "none",
        padding: "4px",
      },
    };
  };

  if (loading) return <p>Loading calendar...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Appointments</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, marginTop: 20 }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
      />

      <div style={{ marginTop: 20 }}>
        <h3>Legend:</h3>
        <div>
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 20,
              backgroundColor: "#34d399",
              marginRight: 8,
            }}
          ></span>
          Free Slot
        </div>
        <div>
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 20,
              backgroundColor: "#f87171",
              marginRight: 8,
            }}
          ></span>
          Booked Slot
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;