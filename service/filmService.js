const db = require("../connector/filmDb");

async function createFilm(FilmInfoDaoInstance) {
  const insertedFilm = await db.filmCreateQuery(FilmInfoDaoInstance);
  return insertedFilm;
}

async function getFilm() {
  const gettedFilm = await db.filmGetQuery();
  return gettedFilm;
}

async function getFilmById(film_id) {
  const gettedFilmById = await db.filmGetByIdQuery(film_id);
  return gettedFilmById;
}

async function updateFilm(film_id, description, rental_duration, rental_rate) {
  const updatedFilm = await db.filmUpdateQuery(
    film_id,
    description,
    rental_duration,
    rental_rate
  );
  return updatedFilm;
}

async function removeFilm(film_id) {
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
