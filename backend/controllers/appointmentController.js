import { getAllAppointments, addAppointment, updateAppointment, deleteAppointment } from "../models/Appointment.js";

export const getAppointments = async (req, res) => {
  const appointments = await getAllAppointments();
  res.json(appointments);
};

export const createAppointment = async (req, res) => {
  const { user_id, service_id, appointment_date } = req.body;
  const appointment = await addAppointment(user_id, service_id, appointment_date);
  res.status(201).json(appointment);
};

export const editAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointment_date, status } = req.body;
  const appointment = await updateAppointment(id, appointment_date, status);
  res.json(appointment);
};

export const removeAppointment = async (req, res) => {
  const { id } = req.params;
  await deleteAppointment(id);
  res.json({ message: "Appointment deleted" });
};
