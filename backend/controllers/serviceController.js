import { getAllServices, addService, updateService, deleteService } from "../models/Service.js";

export const getServices = async (req, res) => {
  const services = await getAllServices();
  res.json(services);
};

export const createService = async (req, res) => {
  const { name, price } = req.body;
  const service = await addService(name, price);
  res.status(201).json(service);
};

export const editService = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const service = await updateService(id, name, price);
  res.json(service);
};

export const removeService = async (req, res) => {
  const { id } = req.params;
  await deleteService(id);
  res.json({ message: "Service deleted" });
};
