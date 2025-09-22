import pool from "../db.js";

export async function getAllAppointments() {
  const result = await pool.query(`
    SELECT a.id, u.name as user_name, s.name as service_name, a.appointment_date, a.status
    FROM appointments a
    JOIN users u ON a.user_id = u.id
    JOIN services s ON a.service_id = s.id
    ORDER BY a.appointment_date
  `);
  return result.rows;
}

export async function addAppointment(user_id, service_id, appointment_date) {
  const result = await pool.query(
    "INSERT INTO appointments (user_id, service_id, appointment_date) VALUES ($1, $2, $3) RETURNING *",
    [user_id, service_id, appointment_date]
  );
  return result.rows[0];
}

export async function updateAppointment(id, appointment_date, status) {
  const result = await pool.query(
    "UPDATE appointments SET appointment_date=$1, status=$2 WHERE id=$3 RETURNING *",
    [appointment_date, status, id]
  );
  return result.rows[0];
}

export async function deleteAppointment(id) {
  await pool.query("DELETE FROM appointments WHERE id=$1", [id]);
}
