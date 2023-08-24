const db = require("../connector/rentalDb");

async function createRental(
  rental_date,
  inventory_id,
  customer_id,
  return_date,
  staff_id
) {
  /* const createQuery = db.queries.insertRental;
  const values = [
    rental_date,
    inventory_id,
    customer_id,
    return_date,
    staff_id,
  ];
  const client = await db.pool1.connect();
  const result = await client.query(createQuery, values);*/
  const insertedRental = await db.rentalCreateQuery(
    rental_date,
    inventory_id,
    customer_id,
    return_date,
    staff_id
  );
  return insertedRental;
}

async function getRental() {
  /* const getQuery = db.queries.gettingRental;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);*/
  const gettedRental = await db.rentalGetQuery();
  return gettedRental;
}

async function getRentalById(rental_id) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const getByIdQuery = db.queries.getRentalById;
  const values = [rental_id];
  const result = await client.query(getByIdQuery, values);*/
  const gettedRentalById = await db.rentalGetByIdQuery(rental_id);
  return gettedRentalById;
}

async function updateRental(rental_id, rental_date, customer_id, return_date) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const updateQuery = db.queries.updateRentalById;
  const values = [rental_date, customer_id, return_date, rental_id];
  const result = await client.query(updateQuery, values);*/
  const updatedRental = await db.rentalUpdateQuery(
    rental_id,
    rental_date,
    customer_id,
    return_date
  );
  return updatedRental;
}

async function removeRental(rental_id) {
  /* const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [rental_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("rental id is not valid!!");
  }
  const removeQuery = db.queries.removeRentalById;
  const values = [rental_id];
  const result = await client.query(removeQuery, values);*/
  const removedRental = await db.rentalRemoveQuery(rental_id);
  return removedRental;
}

module.exports = {
  createRental,
  getRental,
  getRentalById,
  updateRental,
  removeRental,
};
