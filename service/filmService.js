const db = require("../connector/filmDb");

async function createFilm(filmInfoDaoInstance) {
  const insertFilmList = await db.filmCreateQuery(filmInfoDaoInstance);
  return insertFilmList;
}

async function getFilm() {
  const getFilmList = await db.filmGetQuery();
  return getFilmList;
}

async function getFilmById(filmInfoDaoInstance) {
  const getFilmListById = await db.filmGetByIdQuery(filmInfoDaoInstance);
  return getFilmListById;
}

async function updateFilm(filmInfoParamsInstance, filmInfoDaoInstance) {
  const updateFilmList = await db.filmUpdateQuery(
    filmInfoParamsInstance,
    filmInfoDaoInstance
  );
  return updateFilmList;
}

async function removeFilm(filmInfoParamsInstance) {
  const removeFilmList = await db.filmRemoveQuery(filmInfoParamsInstance);
  return removeFilmList;
}

module.exports = {
  createFilm,
  getFilm,
  getFilmById,
  updateFilm,
  removeFilm,
};
