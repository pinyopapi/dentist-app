import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AdminPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const fetchEvents = async () => {
        try {
            const res = await fetch("/calendar/events");
            const data = await res.json();

            const formatted = data.map((e) => ({
                id: e.id,
                title: e.bookedBy ? `Booked by ${e.bookedBy}` : e.summary,
                start: new Date(e.start),
                end: new Date(e.end),
                bookedBy: e.bookedBy,
            }));

            setEvents(formatted);
        } catch (err) {
            console.error("Error fetching events", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleCreateSlot = async (e) => {
        e.preventDefault();
        if (!start || !end) return alert("Please select start and end time");

        try {
            const res = await fetch("/calendar/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    summary: "Free Slot",
                    start: new Date(start).toISOString(),
                    end: new Date(end).toISOString(),
                }),

            });
            if (!res.ok) throw new Error("Failed to create slot");
            alert("Free slot created!");
            setStart("");
            setEnd("");
            fetchEvents();
        } catch (err) {
            console.error("Error creating slot:", err);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            const res = await fetch("/calendar/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventId }),
            });

            if (!res.ok) throw new Error("Delete failed");

            alert("Event deleted");
            fetchEvents();
        } catch (err) {
            console.error("Error deleting event:", err);
        }
    };

    const handleSelectEvent = (event) => {
        const msg = event.bookedBy
            ? `Booked by: ${event.bookedBy}`
            : "This is a free slot.";

        if (window.confirm(`${msg}\n\nDelete this event?`)) {
            handleDelete(event.id);
        }
    };

    if (loading) return <p>Loading calendar...</p>;

    return (
        <div>
            <h1>Admin: Manage Calendar</h1>

            <form onSubmit={handleCreateSlot} style={{ marginBottom: 20 }}>
                <label>
                    Start:
                    <input
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </label>
                <label style={{ marginLeft: 10 }}>
                    End:
                    <input
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </label>
                <button type="submit" style={{ marginLeft: 10 }}>
                    Create Free Slot
                </button>
            </form>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.bookedBy ? "red" : "green",
                        color: "white",
                    },
                })}
                onSelectEvent={handleSelectEvent}
            />
        </div>
    );
};

export default AdminPage;
