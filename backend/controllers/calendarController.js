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
      bookedBy: event.extendedProperties?.private?.bookedBy || null,
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
      start: { dateTime: start, timeZone: "Europe/Budapest" },
      end: { dateTime: end, timeZone: "Europe/Budapest" },
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
    const { eventId, bookedBy, userToken } = req.body;

    const eventResponse = await calendar.events.get({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
    });
    const event = eventResponse.data;

    if (event.extendedProperties?.private?.bookedBy) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    event.summary = `Booked`;
    event.colorId = 11;
    event.extendedProperties = { private: { bookedBy } };

    const updated = await calendar.events.update({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      eventId,
      resource: event,
    });

    if (userToken) {
      const userAuth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID);
      userAuth.setCredentials({ access_token: userToken });

      const userCalendar = google.calendar({ version: "v3", auth: userAuth });
      await userCalendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: "Appointment with Dentist",
          start: event.start,
          end: event.end,
          description: "Booked through dentist app",
        },
      });
    }

    res.status(200).json({
      message: "Slot successfully booked",
      event: updated.data,
    });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ message: "Failed to book slot" });
  }
};

export const bookUserCalendarEvent = async (req, res) => {
  try {
    const { accessToken, summary, start, end } = req.body;

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const calendarAPI = google.calendar({ version: "v3", auth });

    const event = {
      summary,
      start: { dateTime: start, timeZone: "Europe/Budapest" },
      end: { dateTime: end, timeZone: "Europe/Budapest" },
    };

    const response = await calendarAPI.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    res.status(201).json(response.data);
  } catch (err) {
    console.error("Error booking user calendar event:", err);
    res.status(500).json({ message: "Failed to add event to user calendar" });
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