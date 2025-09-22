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

export async function updateService(id, name, price) {
  const result = await pool.query(
    "UPDATE services SET name=$1, price=$2 WHERE id=$3 RETURNING *",
    [name, price, id]
  );
  return result.rows[0];
}

export async function deleteService(id) {
  await pool.query("DELETE FROM services WHERE id=$1", [id]);
}
