import express from "express";
import { getGoogleAuthUrl, googleCallback, createGoogleCalendarEvent } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/auth-url", getGoogleAuthUrl);
router.get("/callback", googleCallback);
router.post("/event", createGoogleCalendarEvent);

export default router;