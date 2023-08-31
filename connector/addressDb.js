const { Pool } = require("pg");

const validation = require("../validation/addressValidation");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertAddress:
    "INSERT INTO address(address, address2, district, city_id, postal_code, phone) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
  gettingAddress: "SELECT * FROM address",
  findIdQuery: " SELECT address_id FROM address WHERE address_id=$1 ",
  getAddressById: "SELECT * FROM address WHERE address_id=$1",
  updateAddressById:
    "UPDATE address SET address =$1, address2 =$2, district =$3 WHERE address_id =$4 RETURNING *",
  removeAddressById: " DELETE FROM address WHERE address_id = $1 RETURNING * ",
};

async function addressCreateQuery(AddressInfoDaoInstance) {
  const { error } = validation.createAddressSchema.validate(
    AddressInfoDaoInstance
  );
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const insertQuery = queries.insertAddress;
  const values = [
    AddressInfoDaoInstance.address,
    AddressInfoDaoInstance.address2,
    AddressInfoDaoInstance.district,
    AddressInfoDaoInstance.city_id,
    AddressInfoDaoInstance.postal_code,
    AddressInfoDaoInstance.phone,
  ];
  const client = await pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function addressGetQuery() {
  const getQuery = queries.gettingAddress;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function addressGetByIdQuery(address_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const getByIdQuery = queries.getAddressById;
  const values = [address_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function addressUpdateQuery(address_id, address, address2, district) {
  const { error } = validation.updateAddressSchema.validate({
    address,
    address2,
    district,
  });
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const updateQuery = queries.updateAddressById;
  const values = [address, address2, district, address_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function addressRemoveQuery(address_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [address_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("address id is not valid!!");
  }
  const removeQuery = queries.removeAddressById;
  const values = [address_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  pool1,
  queries,
  addressCreateQuery,
  addressGetQuery,
  addressGetByIdQuery,
  addressUpdateQuery,
  addressRemoveQuery,
};
