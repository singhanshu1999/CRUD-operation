const db = require("../connector/db");

async function createAddress(
  address,
  address2,
  district,
  city_id,
  postal_code,
  phone
) {
  const insertQuery =
    "INSERT INTO address(address, address2, district, city_id, postal_code, phone) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [address, address2, district, city_id, postal_code, phone];
  const result = await db.query(insertQuery, values);
  return result.rows[0];
}

async function getAddress() {
  const getQuery = "SELECT * FROM address";
  const result = await db.query(getQuery);
  return result.rows;
}

async function getAddressById(address_id) {
  const getByIdQuery = "SELECT * FROM address WHERE address_id=$1";
  const values = [address_id];
  const result = await db.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateAddress(address_id, address, address2, district) {
  const updateQuery =
    "UPDATE address SET address =$1, address2 =$2, district =$3 WHERE address_id =$4 RETURNING *";
  const values = [address, address2, district, address_id];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

async function removeAddress(address_id) {
  const removeQuery = "DELETE FROM address WHERE address_id =$1 RETURNING *";
  const values = [address_id];
  const result = await db.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
};
