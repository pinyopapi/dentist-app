import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const localizer = momentLocalizer(moment);

const AppointmentsCalendar = ({ onSelectSlot }) => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const events = data.map((a) => ({
          start: new Date(a.appointment_date),
          end: new Date(a.appointment_date),
          title: "Booked",
        }));
        setAppointments(events);
      } catch (err) {
        console.error("Error fetching appointments", err);
      }
    };
    fetchAppointments();
  }, [token]);

  return (
    <Calendar
      localizer={localizer}
      events={appointments}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      selectable
      onSelectSlot={onSelectSlot}
      eventPropGetter={(event) => ({
        style: {
          backgroundColor: event.title === "Booked" ? "#d9534f" : "#5cb85c",
          color: "white",
        },
      })}
    />
  );
};

export default AppointmentsCalendar;