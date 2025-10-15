import {
  listDentistEvents,
  createDentistEvent,
  updateDentistEvent,
  deleteDentistEvent,
  createUserEvent,
} from "../utils/googleCalendarService.js";

export const getGoogleCalendarEvents = async (req, res) => {
  try {
    const items = await listDentistEvents();

    const formattedEvents = items.map((event) => ({
      id: event.id,
      summary: event.summary || "Free Slot",
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      bookedBy: event.extendedProperties?.private?.bookedBy || null,
    }));

    res.json(formattedEvents);
  } catch (err) {
    console.error("Error fetching Google Calendar events:", err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const createGoogleCalendarEvent = async (req, res) => {
  try {
    const { summary, start, end } = req.body;
    const event = await createDentistEvent(summary, start, end);
    res.status(201).json(event);
  } catch (err) {
    console.error("Error creating Google Calendar event:", err);
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const bookGoogleCalendarSlot = async (req, res) => {
  try {
    const { eventId, bookedBy, userToken } = req.body;

    const items = await listDentistEvents();
    const event = items.find((e) => e.id === eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.bookedBy) return res.status(400).json({ message: "Slot already booked" });

    const updatedEvent = {
      ...event,
      summary: "Booked",
      colorId: 11,
      extendedProperties: { private: { bookedBy } },
    };

    const updated = await updateDentistEvent(eventId, updatedEvent);

    if (userToken) {
      await createUserEvent(
        userToken,
        "Appointment with Dentist",
        event.start,
        event.end,
        "Booked through dentist app"
      );
    }

    res.status(200).json({ message: "Slot successfully booked", event: updated });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ message: "Failed to book slot" });
  }
};

export const bookUserCalendarEvent = async (req, res) => {
  try {
    const { accessToken, summary, start, end } = req.body;
    const event = await createUserEvent(accessToken, summary, start, end, "");
    res.status(201).json(event);
  } catch (err) {
    console.error("Error booking user calendar event:", err);
    res.status(500).json({ message: "Failed to add event to user calendar" });
  }
};

export const deleteGoogleCalendarEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    await deleteDentistEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
