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
    const formatted = items.map(e => ({
      id: e.id,
      summary: e.summary || "Free Slot",
      start: e.start.dateTime || e.start.date,
      end: e.end.dateTime || e.end.date,
      bookedBy: e.extendedProperties?.private?.bookedBy || null,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const createGoogleCalendarEvent = async (req, res) => {
  try {
    const { summary, start, end } = req.body;
    const event = await createDentistEvent(summary, start, end);
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const bookGoogleCalendarSlot = async (req, res) => {
  try {
    const { eventId, bookedBy, userToken } = req.body;

    const items = await listDentistEvents();
    const event = items.find(e => e.id === eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.extendedProperties?.private?.bookedBy)
      return res.status(400).json({ message: "Slot already booked" });

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
        event.start.dateTime || event.start,
        event.end.dateTime || event.end,
        "Booked through dentist app"
      );
    }

    res.status(200).json({ message: "Slot successfully booked", event: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book slot" });
  }
};

export const bookUserCalendarEvent = async (req, res) => {
  try {
    const { accessToken, summary, start, end } = req.body;
    const event = await createUserEvent(accessToken, summary, start, end, "");
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add event to user calendar" });
  }
};

export const deleteGoogleCalendarEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    await deleteDentistEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};