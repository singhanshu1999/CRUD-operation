const db = require("../connector/customerDb");

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
  const createQuery = db.queries.insertCustomer;
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
  const client = await db.pool1.connect();
  const result = await client.query(createQuery, values);
  return result.rows[0];
}

async function getCustomer() {
  const getQuery = db.queries.gettingCustomer;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function getCustomerById(customer_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [customer_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const getByIdQuery = db.queries.getCustomerById;
  const values = [customer_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateCustomer(customer_id, store_id, first_name, last_name) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [customer_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const updateQuery = db.queries.updateCustomerById;
  const values = [store_id, first_name, last_name, customer_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function removeCustomer(customer_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [customer_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const removeQuery = db.queries.removeCustomerById;
  const values = [customer_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  removeCustomer,
};
