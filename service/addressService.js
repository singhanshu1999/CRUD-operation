const db = require("../connector/addressDb");

async function createAddress(
  address,
  address2,
  district,
  city_id,
  postal_code,
  phone
) {
  /*const insertQuery = db.queries.insertAddress;
  const values = [address, address2, district, city_id, postal_code, phone];
  const client = await db.pool1.connect();
  const result = await client.query(insertQuery, values);*/
  const insertedAddress = await db.addressCreateQuery(
    address,
    address2,
    district,
    city_id,
    postal_code,
    phone
  );
  return insertedAddress;
}

async function getAddress() {
  /*const getQuery = db.queries.gettingAddress;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);*/
  const gettedAddress = await db.addressGetQuery();
  return gettedAddress;
}

async function getAddressById(address_id) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const getByIdQuery = db.queries.getAddressById;
  const values = [address_id];
  const result = await client.query(getByIdQuery, values);*/
  const gettedAddressById = await db.addressGetByIdQuery(address_id);
  return gettedAddressById;
}

async function updateAddress(address_id, address, address2, district) {
  /* const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const updateQuery = db.queries.updateAddressById;
  const values = [address, address2, district, address_id];
  const result = await client.query(updateQuery, values);*/
  const updatedAddress = await db.addressUpdateQuery(
    address_id,
    address,
    address2,
    district
  );
  return updatedAddress;
}

async function removeAddress(address_id) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const removeQuery = db.queries.removeAddressById;
  const values = [address_id];
  const result = await client.query(removeQuery, values);*/
  const removedAddress = await db.addressRemoveQuery(address_id);
  return removedAddress;
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
};
