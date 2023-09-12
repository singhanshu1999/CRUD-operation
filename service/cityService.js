const db = require("../connector/cityDb");

async function createCity(cityInfoDaoInstance) {
  const insertedCity = await db.cityCreateQuery(cityInfoDaoInstance);
  return insertedCity;
}

async function getCity() {
  const gettedCity = await db.cityGetQuery();
  return gettedCity;
}

async function getCityById(cityInfoInstance) {
  const gettedCityById = await db.cityGetByIdQuery(cityInfoInstance);
  return gettedCityById;
}

async function updateCity(cityInfoInstance, cityInfoDaoInstance) {
  const updatedCity = await db.cityUpdateQuery(
    cityInfoInstance,
    cityInfoDaoInstance
  );
  return updatedCity;
}

async function removeCity(cityInfoInstance) {
  const deletedCity = await db.cityRemoveQuery(cityInfoInstance);
  return deletedCity;
}

module.exports = {
  createCity,
  getCity,
  getCityById,
  updateCity,
  removeCity,
};
