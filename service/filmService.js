const db = require("../connector/db");

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
  const insertQuery =
    "INSERT INTO film(title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *";
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
  const result = await db.query(insertQuery, values);
  return result.rows[0];
}

async function getFilm() {
  const getQuery = " SELECT * FROM film ";
  const result = await db.query(getQuery);
  return result.rows;
}

async function getFilmById(film_id) {
  const checkQuery = " SELECT film_id FROM film WHERE film_id=$1 ";
  const checkResult = await db.query(checkQuery, [film_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const getByIdQuery = "SELECT * FROM film WHERE film_id =$1";
  const values = [film_id];
  const result = await db.query(getByIdQuery, values);
  return result.rows[0];
}

async function updateFilm(film_id, description, rental_duration, rental_rate) {
  const checkQuery = " SELECT film_id FROM film WHERE film_id=$1 ";
  const checkResult = await db.query(checkQuery, [film_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const updateQuery =
    " UPDATE film SET description=$1, rental_duration=$2, rental_rate=$3 WHERE film_id=$4 RETURNING *";
  const values = [description, rental_duration, rental_rate, film_id];
  const result = await db.query(updateQuery, values);
  return result.rows[0];
}

async function removeFilm(film_id) {
  const checkQuery = " SELECT film_id FROM film WHERE film_id=$1 ";
  const checkResult = await db.query(checkQuery, [film_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("film id is not available");
  }
  const removeQuery = " DELETE FROM film WHERE film_id = $1 RETURNING * ";
  const values = [film_id];
  const result = await db.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createFilm,
  getFilm,
  getFilmById,
  updateFilm,
  removeFilm,
};
