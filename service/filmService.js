const db = require("../connector/filmDb");

async function createFilm(filmInfoDaoInstance) {
  const insertedFilm = await db.filmCreateQuery(filmInfoDaoInstance);
  return insertedFilm;
}

async function getFilm() {
  const gettedFilm = await db.filmGetQuery();
  return gettedFilm;
}

async function getFilmById(filmInfoDaoInstance) {
  const gettedFilmById = await db.filmGetByIdQuery(filmInfoDaoInstance);
  return gettedFilmById;
}

async function updateFilm(filmInfoParamsInstance, filmInfoDaoInstance) {
  const updatedFilm = await db.filmUpdateQuery(
    filmInfoParamsInstance,
    filmInfoDaoInstance
  );
  return updatedFilm;
}

async function removeFilm(filmInfoParamsInstance) {
  const removedFilm = await db.filmRemoveQuery(filmInfoParamsInstance);
  return removedFilm;
}

module.exports = {
  createFilm,
  getFilm,
  getFilmById,
  updateFilm,
  removeFilm,
};
