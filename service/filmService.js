const db = require("../connector/filmDb");
//const { FilmInfo } = require("/pojo/FilmInfo");

async function createFilm(
  title,
  description,
  release_year,
  language_id,
  rental_duration,
  rental_rate,
  length,
  replacement_cost,
  rating,
  special_features
) {
  /* const insertQuery = db.queries.insertFilm;
  const values = [
    title,
    description,
    release_year,
    language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features,
  ];
  const client = await db.pool1.connect();
  const result = await client.query(insertQuery, values);*/
  const insertedFilm = await db.filmCreateQuery(
    title,
    description,
    release_year,
    language_id,
    rental_duration,
    rental_rate,
    length,
    replacement_cost,
    rating,
    special_features
  );
  return insertedFilm;
}

async function getFilm() {
  /* const getQuery = db.queries.gettingFilm;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);*/
  const gettedFilm = await db.filmGetQuery();
  return gettedFilm;
}

async function getFilmById(film_id) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [film_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const getByIdQuery = db.queries.getFilmById;
  const values = [film_id];
  const result = await client.query(getByIdQuery, values);*/
  const gettedFilmById = await db.filmGetByIdQuery(film_id);
  return gettedFilmById;
}

async function updateFilm(film_id, description, rental_duration, rental_rate) {
  /*const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [film_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const updateQuery = db.queries.updateFilmById;
  const values = [description, rental_duration, rental_rate, film_id];
  const result = await client.query(updateQuery, values);*/
  const updatedFilm = await db.filmUpdateQuery(
    film_id,
    description,
    rental_duration,
    rental_rate
  );
  return updatedFilm;
}

async function removeFilm(film_id) {
  /* const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [film_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const removeQuery = db.queries.removeFilmById;
  const values = [film_id];
  const result = await client.query(removeQuery, values);*/
  const removedFilm = await db.filmRemoveQuery(film_id);
  return removedFilm;
}

module.exports = {
  createFilm,
  getFilm,
  getFilmById,
  updateFilm,
  removeFilm,
};