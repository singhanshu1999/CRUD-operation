const db = require("../connector/addressDb");

async function createAddress(
  address,
  address2,
  district,
  city_id,
  postal_code,
  phone
) {
  const insertQuery = db.queries.insertAddress;
  const values = [address, address2, district, city_id, postal_code, phone];
  const client = await db.pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function getAddress() {
  const getQuery = db.queries.gettingAddress;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function getAddressById(address_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const getByIdQuery = db.queries.getAddressById;
  const values = [address_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateAddress(address_id, address, address2, district) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const updateQuery = db.queries.updateAddressById;
  const values = [address, address2, district, address_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function removeAddress(address_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const removeQuery = db.queries.removeAddressById;
  const values = [address_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
};
