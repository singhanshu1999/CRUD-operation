const db = require("../connector/countryDb");

async function createCountry(countryInfoDaoInstance) {
  const insertCountryList = await db.countryCreateQuery(countryInfoDaoInstance);
  return insertCountryList;
}

async function getCountry() {
  const getCountryList = await db.countryGetQuery();
  return getCountryList;
}

async function getCountryById(countryInfoInstance) {
  const getCountryListById = await db.countryGetByIdQuery(countryInfoInstance);
  return getCountryListById;
}

async function updateCountry(countryInfoInstance, countryInfoDaoInstance) {
  const updateCountryList = await db.countryUpdateQuery(
    countryInfoInstance,
    countryInfoDaoInstance
  );
  return updateCountryList;
}

async function removeCountry(countryInfoInstance) {
  const removeCountryList = await db.countryRemoveQuery(countryInfoInstance);
  return removeCountryList;
}

module.exports = {
  createCountry,
  getCountry,
  getCountryById,
  updateCountry,
  removeCountry,
};
