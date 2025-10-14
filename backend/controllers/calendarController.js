import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/calendar/callback"
);

// URL, frontend opens it to get calendar
export const getGoogleAuthUrl = (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/calendar.events"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.json({ url });
};

// Callback – to get access token
export const googleCallback = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  res.json(tokens);
};

// Event creation
export const createGoogleCalendarEvent = async (req, res) => {
  try {
    const { access_token, summary, start, end } = req.body;
    oauth2Client.setCredentials({ access_token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary,
      start: { dateTime: start },
      end: { dateTime: end },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google Calendar event failed" });
  }
};
