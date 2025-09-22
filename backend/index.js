import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";

import { AppDataSource } from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/services", servicesRoutes);
app.use("/appointments", appointmentsRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
