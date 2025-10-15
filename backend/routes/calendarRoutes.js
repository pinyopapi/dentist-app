import express from "express";
import { getGoogleCalendarEvents, createGoogleCalendarEvent, bookGoogleCalendarSlot } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/events", getGoogleCalendarEvents);
router.post("/create", createGoogleCalendarEvent);
router.post("/book", bookGoogleCalendarSlot);

export default router;