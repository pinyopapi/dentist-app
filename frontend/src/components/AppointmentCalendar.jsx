import { useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { LanguageContext } from "../contexts/LanguageContext";
import translations from "../i18n";

const localizer = momentLocalizer(moment);

export const AppointmentCalendar = ({ events, onSelectEvent, showBookedBy }) => {
  const { language } = useContext(LanguageContext);
  const getText = (key) => translations[key]?.[language] || key;

  const formattedEvents = events.map(e => ({
    ...e,
    title: showBookedBy && e.bookedBy
      ? `${getText("bookedBy")} ${e.bookedBy}`
      : !e.bookedBy
        ? getText("freeSlot")
        : getText("booked"),
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