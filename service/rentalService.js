const db = require("../connector/db");

async function createRental(
  rental_date,
  inventory_id,
  customer_id,
  return_date,
  staff_id
) {
  const createQuery =
    " INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id) VALUES ($1,$2,$3,$4,$5) RETURNING * ";
  const values = [
    rental_date,
    inventory_id,
    customer_id,
    return_date,
    staff_id,
  ];
  const result = await db.query(createQuery, values);
  return result.rows[0];
}

async function getRental() {
  const getQuery = " SELECT * FROM rental ";
  const result = await db.query(getQuery);
  return result.rows;
}

async function getRentalById(rental_id) {
  const checkQuery = "SELECT rental_id FROM rental WHERE rental_id=$1 ";
  const checkResult = await db.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const getByIdQuery = " SELECT * FROM rental WHERE rental_id=$1 ";
  const values = [rental_id];
  const result = await db.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateRental(rental_id, rental_date, customer_id, return_date) {
  const checkQuery = "SELECT rental_id FROM rental WHERE rental_id=$1 ";
  const checkResult = await db.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const updateQuery =
    " UPDATE rental SET rental_date=$1, customer_id=$2, return_date=$3 WHERE rental_id =$4 RETURNING *";
  const values = [rental_date, customer_id, return_date, rental_id];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

async function removeRental(rental_id) {
  const checkQuery = " SELECT rental_id FROM rental WHERE rental_id=$1 ";
  const checkResult = await db.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const removeQuery = "DELETE FROM rental WHERE rental_id =$1 RETURNING *";
  const values = [rental_id];
  const result = await db.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createRental,
  getRental,
  getRentalById,
  updateRental,
  removeRental,
};
