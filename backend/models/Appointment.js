import pool from "../db.js";

export async function getAppointments() {
  const result = await pool.query("SELECT * FROM appointments");
  return result.rows;
}

export async function addAppointment(userId, serviceId, date) {
  const result = await pool.query(
    "INSERT INTO appointments (user_id, service_id, date) VALUES ($1, $2, $3) RETURNING *",
    [userId, serviceId, date]
  );
  return result.rows[0];
}
