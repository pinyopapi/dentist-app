import pool from "../db.js";

export async function getAllServices() {
  const result = await pool.query("SELECT * FROM services");
  return result.rows;
}

export async function addService(name, price) {
  const result = await pool.query(
    "INSERT INTO services (name, price) VALUES ($1, $2) RETURNING *",
    [name, price]
  );
  return result.rows[0];
}
