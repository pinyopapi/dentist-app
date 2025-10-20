import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const KEYFILEPATH = path.join(process.cwd(), "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const calendar = google.calendar({ version: "v3", auth });

export const getUserCalendar = (accessToken) => {
  const userAuth = new google.auth.OAuth2();
  userAuth.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth: userAuth });
};

export const listDentistEvents = async () => {
  const events = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: new Date().toISOString(),
    maxResults: 50,
    singleEvents: true,
    orderBy: "startTime",
  });
  return events.data.items;
};

export const createDentistEvent = async (summary, start, end) => {
  const event = {
    summary,
    start: { dateTime: start, timeZone: "Europe/Budapest" },
    end: { dateTime: end, timeZone: "Europe/Budapest" },
  };
  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    resource: event,
  });
  return response.data;
};

export const updateDentistEvent = async (eventId, event) => {
  const response = await calendar.events.update({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId,
    resource: event,
  });
  return response.data;
};

export const deleteDentistEvent = async (eventId) => {
  await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId,
  });
};

export const createUserEvent = async (accessToken, summary, start, end, description) => {
  const userCalendar = getUserCalendar(accessToken);
  const event = {
    summary,
    start: { dateTime: start, timeZone: "Europe/Budapest" },
    end: { dateTime: end, timeZone: "Europe/Budapest" },
    description,
  };
  const response = await userCalendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });
  return response.data;
};