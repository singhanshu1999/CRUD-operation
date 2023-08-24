const { Pool } = require("pg");

const validation = require("../validation/rentalValidation");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertRental:
    " INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
  gettingRental: "SELECT * FROM rental",
  findIdQuery: " SELECT rental_id FROM rental WHERE rental_id=$1 ",
  getRentalById: "SELECT * FROM rental WHERE rental_id=$1 ",
  updateRentalById:
    " UPDATE rental SET rental_date=$1, customer_id=$2, return_date=$3 WHERE rental_id =$4 RETURNING *",
  removeRentalById: " DELETE FROM rental WHERE rental_id =$1 RETURNING * ",
};

async function rentalCreateQuery(
  rental_date,
  inventory_id,
  customer_id,
  return_date,
  staff_id
) {
  const { error } = validation.createRentalSchema.validate({
    rental_date,
    inventory_id,
    customer_id,
    return_date,
    staff_id,
  });
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const createQuery = queries.insertRental;
  const values = [
    rental_date,
    inventory_id,
    customer_id,
    return_date,
    staff_id,
  ];
  const client = await pool1.connect();
  const result = await client.query(createQuery, values);
  return result.rows[0];
}

async function rentalGetQuery() {
  const getQuery = queries.gettingRental;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function rentalGetByIdQuery(rental_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const getByIdQuery = queries.getRentalById;
  const values = [rental_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function rentalUpdateQuery(
  rental_id,
  rental_date,
  customer_id,
  return_date
) {
  const { error } = validation.updateRentalSchema.validate({
    rental_date,
    customer_id,
    return_date,
  });
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const updateQuery = queries.updateRentalById;
  const values = [rental_date, customer_id, return_date, rental_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function rentalRemoveQuery(rental_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const removeQuery = queries.removeRentalById;
  const values = [rental_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  pool1,
  queries,
  rentalCreateQuery,
  rentalGetQuery,
  rentalGetByIdQuery,
  rentalUpdateQuery,
  rentalRemoveQuery,
};
