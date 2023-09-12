const db = require("../connector/countryDb");

async function createCountry(countryInfoDaoInstance) {
  const insertedCountry = await db.countryCreateQuery(countryInfoDaoInstance);
  return insertedCountry;
}

async function getCountry() {
  const gettedCountry = await db.countryGetQuery();
  return gettedCountry;
}

async function getCountryById(countryInfoInstance) {
  const gettedCountryById = await db.countryGetByIdQuery(countryInfoInstance);
  return gettedCountryById;
}

async function updateCountry(countryInfoInstance, countryInfoDaoInstance) {
  const updatedCountry = await db.countryUpdateQuery(
    countryInfoInstance,
    countryInfoDaoInstance
  );
  return updatedCountry;
}

async function removeCountry(countryInfoInstance) {
  const removedCountry = await db.countryRemoveQuery(countryInfoInstance);
  return removedCountry;
}

module.exports = {
  createCountry,
  getCountry,
  getCountryById,
  updateCountry,
  removeCountry,
};
