import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export const AppointmentCalendar = ({ events, onSelectEvent, showBookedBy }) => {

  console.log(events);

  const formattedEvents = events.map(e => ({
    ...e,
    title: showBookedBy && e.bookedBy
      ? `Booked by ${e.bookedBy}`
      : e.title === "Free Slot"
        ? e.title
        : "Booked",
  }));


  return (
    <Calendar
      localizer={localizer}
      events={formattedEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      eventPropGetter={(event) => ({
        style: {
          backgroundColor: event.bookedBy ? "red" : "green",
          color: "white",
        },
      })}
      onSelectEvent={onSelectEvent}
    />
  );
};
