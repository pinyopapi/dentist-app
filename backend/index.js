import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";

import pool from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);
app.use("/calendar", calendarRoutes);

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("DB connection failed", err);
  } else {
    console.log("DB connected:", result.rows[0]);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
});
