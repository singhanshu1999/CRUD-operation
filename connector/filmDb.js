const { Pool } = require("pg");

const validation = require("../validation/filmValidation");
const FilmInfoDao = require("../pojo/FilmInfo");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertFilm:
    " INSERT INTO film (title,description,release_year,language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
  gettingFilm: "SELECT * FROM film",
  findIdQuery: " SELECT film_id FROM film WHERE film_id=$1 ",
  getFilmById: "SELECT * FROM film WHERE film_id=$1 ",
  updateFilmById:
    " UPDATE film SET description=$1, rental_duration=$2, rental_rate=$3 WHERE film_id=$4 RETURNING *",
  removeFilmById: " DELETE FROM film WHERE film_id =$1 RETURNING * ",
};

async function filmCreateQuery(filmInfoDaoInstance) {
  try {
    console.log("FilmInfoDaoInstance:", filmInfoDaoInstance);
    const { error } = validation.createFilmSchema.validate(filmInfoDaoInstance);
    if (error) {
      console.log(error);
      console.error("Validation error:", error.details[0].message);
      return response.status(400).json({ error: "" });
    }
    const insertQuery = queries.insertFilm;
    const values = [
      filmInfoDaoInstance.title,
      filmInfoDaoInstance.description,
      filmInfoDaoInstance.release_year,
      filmInfoDaoInstance.language_id,
      filmInfoDaoInstance.rental_duration,
      filmInfoDaoInstance.rental_rate,
      filmInfoDaoInstance.length,
      filmInfoDaoInstance.replacement_cost,
      filmInfoDaoInstance.rating,
      filmInfoDaoInstance.special_features,
    ];
    const client = await pool1.connect();
    const result = await client.query(insertQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in filmCreateQuery:", error.message);
    return null;
  }
}

async function filmGetQuery() {
  try {
    const getQuery = queries.gettingFilm;
    const client = await pool1.connect();
    const result = await client.query(getQuery);
    return result.rows;
  } catch (error) {
    console.error("Error in filmGetQuery:", error.message);
    return null;
  }
}

async function filmGetByIdQuery(filmInfoDaoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      filmInfoDaoInstance.film_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("film id is not available");
      return response.status(400).json({ error: "" });
    }
    const getByIdQuery = queries.getFilmById;
    const values = [filmInfoDaoInstance.film_id];
    const result = await client.query(getByIdQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in filmGetByIdQuery:", error.message);
    return null;
  }
}

async function filmUpdateQuery(filmInfoParamsInstance, filmInfoDaoInstance) {
  try {
    console.log("FIlmInfoDaoInstance: ", filmInfoDaoInstance);
    const { error } = validation.updateFilmSchema.validate(filmInfoDaoInstance);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return response.status(400).json({ error: "" });
    }
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      filmInfoParamsInstance.film_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("film id is not available");
      return response.status(400).json({ error: "" });
    }
    const updateQuery = queries.updateFilmById;
    const values = [
      filmInfoDaoInstance.description,
      filmInfoDaoInstance.rental_duration,
      filmInfoDaoInstance.rental_rate,
      filmInfoParamsInstance.film_id,
    ];
    const result = await client.query(updateQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in filmUpdateQuery:", error.message);
    return null;
  }
}

async function filmRemoveQuery(filmInfoParamsInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      filmInfoParamsInstance.film_id,
    ]);
    if (checkResult.rows.length === 0) {
      console.error("film id is not available");
      return response.status(400).json({ error: "" });
    }
    const removeQuery = queries.removeFilmById;
    const values = [filmInfoParamsInstance.film_id];
    const result = await client.query(removeQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in filmRemoveQuery:", error.message);
    return null;
  }
}

module.exports = {
  pool1,
  queries,
  filmCreateQuery,
  filmGetQuery,
  filmGetByIdQuery,
  filmUpdateQuery,
  filmRemoveQuery,
};
