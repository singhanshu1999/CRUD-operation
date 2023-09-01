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

async function filmCreateQuery(FilmInfoDaoInstance) {
  console.log("FilmInfoDaoInstance:", FilmInfoDaoInstance);
  const { error } = validation.createFilmSchema.validate(FilmInfoDaoInstance);
  if (error) {
    console.log(error);
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const insertQuery = queries.insertFilm;
  const values = [
    FilmInfoDaoInstance.title,
    FilmInfoDaoInstance.description,
    FilmInfoDaoInstance.release_year,
    FilmInfoDaoInstance.language_id,
    FilmInfoDaoInstance.rental_duration,
    FilmInfoDaoInstance.rental_rate,
    FilmInfoDaoInstance.length,
    FilmInfoDaoInstance.replacement_cost,
    FilmInfoDaoInstance.rating,
    FilmInfoDaoInstance.special_features,
  ];
  const client = await pool1.connect();
  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function filmGetQuery() {
  const getQuery = queries.gettingFilm;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function filmGetByIdQuery(FilmInfoDaoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    FilmInfoDaoInstance.film_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const getByIdQuery = queries.getFilmById;
  const values = [FilmInfoDaoInstance.film_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function filmUpdateQuery(FilmInfoParamsInstance, FilmInfoDaoInstance) {
  console.log("FIlmInfoDaoInstance: ", FilmInfoDaoInstance);
  const { error } = validation.updateFilmSchema.validate(FilmInfoDaoInstance);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    FilmInfoParamsInstance.film_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const updateQuery = queries.updateFilmById;
  const values = [
    FilmInfoDaoInstance.description,
    FilmInfoDaoInstance.rental_duration,
    FilmInfoDaoInstance.rental_rate,
    FilmInfoParamsInstance.film_id,
  ];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function filmRemoveQuery(FilmInfoParamsInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    FilmInfoParamsInstance.film_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const removeQuery = queries.removeFilmById;
  const values = [FilmInfoParamsInstance.film_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
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
