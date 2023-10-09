const { Pool } = require("pg");

const validation = require("../validation/countryValidation");
const { response } = require("express");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertCountry: "INSERT INTO country (country_name) VALUES ($1) RETURNING *",
  gettingCountry: "SELECT * FROM country ",
  findIdQuery: "SELECT country_id from country WHERE country_id=$1 ",
  getCountryById: "SELECT * FROM country WHERE country_id=$1 ",
  updateCountryById:
    "UPDATE country SET country_name=$1 where country_id=$2 RETURNING * ",
  removeCountryById: "DELETE FROM country WHERE country_id=$1 RETURNING * ",
};

async function countryCreateQuery(countryInfoDaoInstance) {
  try {
    const { error } = validation.createCountrySchema.validate(
      countryInfoDaoInstance
    );
    if (error) {
      console.error("Validation error: ", error.details[0].message);
      return response.status(400).json({ error: "" });
    }
    const insertQuery = queries.insertCountry;
    const values = [countryInfoDaoInstance.country_name];
    const client = await pool1.connect();
    const result = await client.query(insertQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in countryCreateQuery: ", error.message);
    return null;
  }
}

async function countryGetQuery() {
  try {
    const getQuery = queries.gettingCountry;
    const client = await pool1.connect();
    const result = await client.query(getQuery);
    return result.rows;
  } catch (error) {
    console.error("Error in coutryGetQuery: ", error.message);
    return null;
  }
}

async function countryGetByIdQuery(countryInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      countryInfoInstance.country_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("country id is not available");
      return response.status(400).json({ error: "" });
    }
    const getByIdQuery = queries.getCountryById;
    const values = [countryInfoInstance.country_id];
    const result = await client.query(getByIdQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in countryGetByIdQuery: ", error.message);
    return null;
  }
}

async function countryUpdateQuery(countryInfoInstance, countryInfoDaoInstance) {
  try {
    const { error } = validation.updateCountrySchema.validate(
      countryInfoDaoInstance
    );
    if (error) {
      console.error("Validation error: ", error.details[0].message);
      return response.status(400).json({ error: "" });
    }
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      countryInfoInstance.country_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("country id is not valid!!!");
      return response.status(400).json({ error: "" });
    }
    const updateQuery = queries.updateCountryById;
    const values = [
      countryInfoDaoInstance.country_name,
      countryInfoInstance.country_id,
    ];
    const result = await client.query(updateQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in countryUpdateQuery: ", error.message);
    return null;
  }
}

async function countryRemoveQuery(countryInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      countryInfoInstance.country_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("country id is not available");
      return response.status(400).json({ error: "" });
    }
    const removeQuery = queries.removeCountryById;
    const values = [countryInfoInstance.country_id];
    const result = await client.query(removeQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in countryRemoveQuery: ", error);
    return null;
  }
}

module.exports = {
  pool1,
  queries,
  countryCreateQuery,
  countryGetQuery,
  countryGetByIdQuery,
  countryUpdateQuery,
  countryRemoveQuery,
};
