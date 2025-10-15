import express from "express";
import { getGoogleCalendarEvents, createGoogleCalendarEvent, bookGoogleCalendarSlot, deleteGoogleCalendarEvent, bookUserCalendarEvent } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/events", getGoogleCalendarEvents);
router.post("/create", createGoogleCalendarEvent);
router.post("/book", bookGoogleCalendarSlot);
router.post("/delete", deleteGoogleCalendarEvent);
router.post("/book-user-calendar", bookUserCalendarEvent);

export default router;