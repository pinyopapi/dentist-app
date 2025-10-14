import express from "express";
import { getGoogleCalendarEvents, createGoogleCalendarEvent } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/events", getGoogleCalendarEvents);
router.post("/create", createGoogleCalendarEvent);

export default router;