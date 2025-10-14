import express from "express";
import { getGoogleCalendarEvents, createGoogleCalendarEvent, createFreeSlot } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/events", getGoogleCalendarEvents);
router.post("/create", createGoogleCalendarEvent);
router.post("/free-slot", createFreeSlot);
router.post("/book", bookGoogleCalendarSlot);

export default router;