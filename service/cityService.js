const db = require("../connector/cityDb");

async function createCity(cityInfoDaoInstance) {
  const insertCityList = await db.cityCreateQuery(cityInfoDaoInstance);
  return insertCityList;
}

async function getCity() {
  const getCityList = await db.cityGetQuery();
  return getCityList;
}

async function getCityById(cityInfoInstance) {
  const getCityListById = await db.cityGetByIdQuery(cityInfoInstance);
  return getCityListById;
}

async function updateCity(cityInfoInstance, cityInfoDaoInstance) {
  const updateCityList = await db.cityUpdateQuery(
    cityInfoInstance,
    cityInfoDaoInstance
  );
  return updateCityList;
}

async function removeCity(cityInfoInstance) {
  const removeCityList = await db.cityRemoveQuery(cityInfoInstance);
  return removeCityList;
}

module.exports = {
  createCity,
  getCity,
  getCityById,
  updateCity,
  removeCity,
};
