import { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../contexts/AuthContext";

const localizer = momentLocalizer(moment);

const AppointmentsCalendar = ({ onSelectSlot }) => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch("/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const event = data.map((a) => ({
        id: a.id,
        title: a.service_name,
        start: new Date(a.appointment_date),
        end: new Date(a.appointment_date),
        allDay: false,
      }));
      setEvents(event);
    };

    fetchAppointments();
  }, [token]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      selectable
      onSelectSlot={onSelectSlot}
    />
  );
};

export default AppointmentsCalendar;