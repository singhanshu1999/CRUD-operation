const db = require("../connector/filmDb");

async function createFilm(FilmInfoDaoInstance) {
  const insertedFilm = await db.filmCreateQuery(FilmInfoDaoInstance);
  return insertedFilm;
}

async function getFilm() {
  const gettedFilm = await db.filmGetQuery();
  return gettedFilm;
}

async function getFilmById(FilmInfoDaoInstance) {
  const gettedFilmById = await db.filmGetByIdQuery(FilmInfoDaoInstance);
  return gettedFilmById;
}

async function updateFilm(FilmInfoParamsInstance, FilmInfoDaoInstance) {
  const updatedFilm = await db.filmUpdateQuery(
    FilmInfoParamsInstance,
    FilmInfoDaoInstance
  );
  return updatedFilm;
}

async function removeFilm(FilmInfoParamsInstance) {
  const removedFilm = await db.filmRemoveQuery(FilmInfoParamsInstance);
  return removedFilm;
}

module.exports = {
  createFilm,
  getFilm,
  getFilmById,
  updateFilm,
  removeFilm,
};
