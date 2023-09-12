const { Pool } = require("pg");

const validation = require("../validation/cityValidation");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertCity:
    "INSERT INTO city (city_name,country_id) VALUES ($1,$2) RETURNING *",
  gettingCity: "SELECT * FROM city ",
  findIdQuery: "SELECT city_id from city WHERE city_id=$1 ",
  findIdQueryCountry: "SELECT * FROM country WHERE country_id = $1",
  getCityById: "SELECT * FROM city WHERE city_id=$1 ",
  updateCityById: "UPDATE city SET city_name=$1 where city_id=$2 RETURNING * ",
  removeCityById: "DELETE FROM city WHERE city_id=$1 RETURNING * ",
};

async function cityCreateQuery(cityInfoDaoInstance) {
  try {
    const { error } = validation.createCitySchema.validate(cityInfoDaoInstance);
    if (error) {
      console.error("Validation error: ", error.details[0].message);
      return;
    }
    const checkQuery = queries.findIdQueryCountry;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      cityInfoDaoInstance.country_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("Country with ID does not exist.");
      return;
    }
    const insertQuery = queries.insertCity;
    const values = [
      cityInfoDaoInstance.city_name,
      cityInfoDaoInstance.country_id,
    ];
    const result = await client.query(insertQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in cityCreateQuery: ", error.message);
    return null;
  }
}

async function cityGetQuery() {
  try {
    const getQuery = queries.gettingCity;
    const client = await pool1.connect();
    const result = await client.query(getQuery);
    return result.rows;
  } catch (error) {
    console.error("Error in cityGetQuery:", error.message);
    return null;
  }
}

async function cityGetByIdQuery(cityInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      cityInfoInstance.city_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("city id is not valid!!!");
    }
    const getByIdQuery = queries.getCityById;
    const values = [cityInfoInstance.city_id];
    const result = await client.query(getByIdQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in cityGetByIdQuery:", error.message);
    return null;
  }
}

async function cityUpdateQuery(cityInfoInstance, cityInfoDaoInstance) {
  try {
    const { error } = validation.updateCitySchema.validate(cityInfoDaoInstance);
    if (error) {
      console.error("Validation error: ", error.details[0].message);
      return;
    }
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      cityInfoInstance.city_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("city id is not valid!!!");
    }
    const updateQuery = queries.updateCityById;
    const values = [cityInfoDaoInstance.city_name, cityInfoInstance.city_id];
    const result = await client.query(updateQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in cityUpdateQuery: ", error.message);
    return null;
  }
}

async function cityRemoveQuery(cityInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      cityInfoInstance.city_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("city id is not available");
    }
    const removeQuery = queries.removeCityById;
    const values = [cityInfoInstance.city_id];
    const result = await client.query(removeQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in cityRemoveQuery: ", error);
    return null;
  }
}

module.exports = {
  pool1,
  queries,
  cityCreateQuery,
  cityGetQuery,
  cityGetByIdQuery,
  cityUpdateQuery,
  cityRemoveQuery,
};
