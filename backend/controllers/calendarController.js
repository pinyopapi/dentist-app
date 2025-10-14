import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";
import { log } from "console";

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
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const formattedEvents = events.data.items.map((event) => ({
      id: event.id,
      summary: event.summary,
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
