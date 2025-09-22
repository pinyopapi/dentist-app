const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { AppDataSource } = require("./db");

const authRoutes = require("./routes/authRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");

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
