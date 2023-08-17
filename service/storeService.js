const db = require("../connector/storeDb");

async function createStore(manager_staff_id, address_id) {
  const insertQuery = db.queries.insertStore;
  const values = [manager_staff_id, address_id];
  const client = await db.pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function getStore() {
  const getQuery = db.queries.gettingStore;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function getStoreById(store_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [store_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("store id is not valid!!");
  }
  const getByIdQuery = db.queries.getStoreById;
  const values = [store_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateStore(store_id, address_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [store_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("store id is not valid!!");
  }
  const updateQuery = db.queries.updateStoreById;
  const values = [store_id, address_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function removeStore(store_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [store_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("store id is not valid!!");
  }
  const removeQuery = db.queries.removeStoreById;
  const values = [store_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createStore,
  getStore,
  getStoreById,
  updateStore,
  removeStore,
};
