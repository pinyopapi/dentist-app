import express from "express";
import { getAppointments, createAppointment, editAppointment, removeAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.put("/:id", editAppointment);
router.delete("/:id", removeAppointment);

export default router;
