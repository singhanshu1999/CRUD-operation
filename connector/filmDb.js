const { Pool } = require("pg");

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

module.exports = { pool1, queries };
