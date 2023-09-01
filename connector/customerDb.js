const { Pool } = require("pg");

const validation = require("../validation/customerValidation");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertCustomer:
    " INSERT INTO customer (first_name, store_id, last_name, email, address_id, activebool, create_date, active) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
  gettingCustomer: "SELECT * FROM customer",
  findIdQuery: " SELECT customer_id FROM customer WHERE customer_id=$1 ",
  getCustomerById: "SELECT * FROM customer WHERE customer_id=$1 ",
  updateCustomerById:
    " UPDATE customer SET store_id =$1, first_name =$2, last_name =$3 WHERE customer_id =$4 RETURNING * ",
  removeCustomerById:
    " DELETE FROM customer WHERE customer_id =$1 RETURNING * ",
};

async function customerCreateQuery(CustomerInfoDaoInstance) {
  const { error } = validation.createCustomerSchema.validate(
    CustomerInfoDaoInstance
  );
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const createQuery = queries.insertCustomer;
  const values = [
    CustomerInfoDaoInstance.first_name,
    CustomerInfoDaoInstance.store_id,
    CustomerInfoDaoInstance.last_name,
    CustomerInfoDaoInstance.email,
    CustomerInfoDaoInstance.address_id,
    CustomerInfoDaoInstance.activebool,
    CustomerInfoDaoInstance.create_date,
    CustomerInfoDaoInstance.active,
  ];
  const client = await pool1.connect();
  const result = await client.query(createQuery, values);
  return result.rows[0];
}

async function customerGetQuery() {
  const getQuery = queries.gettingCustomer;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function customerGetByIdQuery(CustomerInfoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    CustomerInfoInstance.customer_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const getByIdQuery = queries.getCustomerById;
  const values = [CustomerInfoInstance.customer_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function customerUpdateQuery(
  CustomerInfoInstance,
  CustomerInfoDaoInstance
) {
  const { error } = validation.updateCustomerSchema.validate(
    CustomerInfoDaoInstance
  );
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    CustomerInfoInstance.customer_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const updateQuery = queries.updateCustomerById;
  const values = [
    CustomerInfoDaoInstance.store_id,
    CustomerInfoDaoInstance.first_name,
    CustomerInfoDaoInstance.last_name,
    CustomerInfoInstance.customer_id,
  ];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function customerRemoveQuery(CustomerInfoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    CustomerInfoInstance.customer_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("customer id is not valid!!");
  }
  const removeQuery = queries.removeCustomerById;
  const values = [CustomerInfoInstance.customer_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  pool1,
  queries,
  customerCreateQuery,
  customerGetQuery,
  customerGetByIdQuery,
  customerUpdateQuery,
  customerRemoveQuery,
};
