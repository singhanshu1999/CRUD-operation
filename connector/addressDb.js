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

async function addressCreateQuery(addressInfoDaoInstance) {
  try {
    const { error } = validation.createAddressSchema.validate(
      addressInfoDaoInstance
    );
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return;
    }
    const insertQuery = queries.insertAddress;
    const values = [
      addressInfoDaoInstance.address,
      addressInfoDaoInstance.address2,
      addressInfoDaoInstance.district,
      addressInfoDaoInstance.city_id,
      addressInfoDaoInstance.postal_code,
      addressInfoDaoInstance.phone,
    ];
    const client = await pool1.connect();
    const result = await client.query(insertQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addressCreateQuery:", error.message);
    return null;
  }
}

async function addressGetQuery() {
  try {
    const getQuery = queries.gettingAddress;
    const client = await pool1.connect();
    const result = await client.query(getQuery);
    return result.rows;
  } catch (error) {
    console.error("Error in addressGetQuery:", error.message);
    return null;
  }
}

async function addressGetByIdQuery(addressInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      addressInfoInstance.address_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("address id is not valid!!");
    }
    const getByIdQuery = queries.getAddressById;
    const values = [addressInfoInstance.address_id];
    const result = await client.query(getByIdQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addressGetByIdQuery:", error.message);
    return null;
  }
}

async function addressUpdateQuery(addressInfoInstance, addressInfoDaoInstance) {
  try {
    const { error } = validation.updateAddressSchema.validate(
      addressInfoDaoInstance
    );
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return;
    }
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      addressInfoInstance.address_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("address id is not valid!!");
    }
    const updateQuery = queries.updateAddressById;
    const values = [
      addressInfoDaoInstance.address,
      addressInfoDaoInstance.address2,
      addressInfoDaoInstance.district,
      addressInfoInstance.address_id,
    ];
    const result = await client.query(updateQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addressUpdateQuery:", error.message);
    return null;
  }
}

async function addressRemoveQuery(addressInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      addressInfoInstance.address_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("address id is not valid!!");
    }
    const removeQuery = queries.removeAddressById;
    const values = [addressInfoInstance.address_id];
    const result = await client.query(removeQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addressRemoveQuery:", error.message);
    return null;
  }
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
