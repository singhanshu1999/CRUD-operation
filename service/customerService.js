const db = require("../connector/db");

async function createCustomer(
  first_name,
  store_id,
  last_name,
  email,
  address_id,
  activebool,
  create_date,
  active
) {
  const createQuery =
    " INSERT INTO customer (first_name, store_id, last_name, email, address_id, activebool, create_date, active) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
  const values = [
    first_name,
    store_id,
    last_name,
    email,
    address_id,
    activebool,
    create_date,
    active,
  ];
  const result = await db.query(createQuery, values);
  return result.rows[0];
}

async function getCustomer() {
  const getQuery = "SELECT * FROM customer ";
  const result = await db.query(getQuery);
  return result.rows;
}

async function getCustomerById(customer_id) {
  const checkQuery = "SELECT customer_id FROM customer WHERE customer_id=$1 ";
  const checkResult = await db.query(checkQuery, [customer_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const getByIdQuery = "SELECT * FROM customer WHERE customer_id=$1 ";
  const values = [customer_id];
  const result = await db.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateCustomer(customer_id, store_id, first_name, last_name) {
  const checkQuery = "SELECT customer_id FROM customer WHERE customer_id=$1 ";
  const checkResult = await db.query(checkQuery, [customer_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const updateQuery =
    " UPDATE customer SET store_id =$1, first_name =$2, last_name =$3 WHERE customer_id =$4 RETURNING *";
  const values = [store_id, first_name, last_name, customer_id];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

async function removeCustomer(customer_id) {
  const checkQuery = " SELECT customer_id FROM customer WHERE customer_id=$1 ";
  const checkResult = await db.query(checkQuery, [customer_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const removeQuery = "DELETE FROM customer WHERE customer_id =$1 RETURNING *";
  const values = [customer_id];
  const result = await db.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  removeCustomer,
};
