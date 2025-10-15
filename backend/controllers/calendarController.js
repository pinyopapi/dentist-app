import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const KEYFILEPATH = path.join(process.cwd(), "dentist-app-475011-e7cc7397f9ab.json");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const calendar = google.calendar({ version: "v3", auth });

export const getGoogleCalendarEvents = async (req, res) => {
  try {
    const events = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: "startTime",
    });

    const formattedEvents = events.data.items.map(event => ({
      id: event.id,
      summary: event.summary || "Free Slot",
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error("Error fetching Google Calendar events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};


export const createGoogleCalendarEvent = async (req, res) => {
  try {
    const { summary, start, end } = req.body;

    const event = {
      summary,
      start: { dateTime: new Date(start).toISOString() },
      end: { dateTime: new Date(end).toISOString() },
    };


    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    });

    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating Google Calendar event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

export const bookGoogleCalendarSlot = async (req, res) => {
  try {
    const { eventId, bookedBy } = req.body;

    const eventResponse = await calendar.events.get({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
    });

    const event = eventResponse.data;

    event.summary = `Booked by ${bookedBy}`;
    event.colorId = 11;

    const updated = await calendar.events.update({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
      resource: event,
    });

    res.status(200).json({
      message: "Slot successfully booked",
      event: updated.data,
    });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ message: "Failed to book slot" });
  }
};

export const deleteGoogleCalendarEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    await calendar.events.delete({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
    });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
