const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});
const queries = {
  insertStore:
    " INSERT INTO store (manager_staff_id,address_id) VALUES ($1,$2) RETURNING *",
  gettingStore: "SELECT * FROM store",
  findIdQuery: " SELECT store_id FROM store WHERE store_id=$1 ",
  getStoreById: "SELECT * FROM store WHERE store_id =$1",
  updateStoreById:
    " UPDATE store SET address_id = $1 WHERE store_id = $2 RETURNING *",
  removeStoreById: " DELETE FROM store WHERE store_id = $1 RETURNING * ",
};

async function storeCreateQuery(StoreInfoDaoInstance) {
  const insertQuery = queries.insertStore;
  const values = [
    StoreInfoDaoInstance.manager_staff_id,
    StoreInfoDaoInstance.address_id,
  ];
  const client = await pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function storeGetQuery() {
  const getQuery = queries.gettingStore;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function storeGetByIdQuery(StoreInfoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    StoreInfoInstance.store_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("store id is not valid!!");
  }
  const getByIdQuery = queries.getStoreById;
  const values = [StoreInfoInstance.store_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function storeUpdateQuery(StoreInfoDaoInstance, StoreInfoDaoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    StoreInfoInstance.store_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("store id is not valid!!");
  }
  const updateQuery = queries.updateStoreById;
  const values = [StoreInfoInstance.store_id, StoreInfoDaoInstance.address_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function storeRemoveQuery(StoreInfoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    StoreInfoInstance.store_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("store id is not valid!!");
  }
  const removeQuery = queries.removeStoreById;
  const values = [StoreInfoInstance.store_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  pool1,
  queries,
  storeCreateQuery,
  storeGetQuery,
  storeGetByIdQuery,
  storeUpdateQuery,
  storeRemoveQuery,
};
