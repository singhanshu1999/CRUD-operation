const db = require("../connector/rentalDb");

async function createRental(rentalInfoDaoInstance) {
  const insertRentalList = await db.rentalCreateQuery(rentalInfoDaoInstance);
  return insertRentalList;
}

async function getRental() {
  const getRentalList = await db.rentalGetQuery();
  return getRentalList;
}

async function getRentalById(rentalInfoInstance) {
  const getRentalListById = await db.rentalGetByIdQuery(rentalInfoInstance);
  return getRentalListById;
}

async function updateRental(rentalInfoInstance, rentalInfoDaoInstance) {
  const updateRentalList = await db.rentalUpdateQuery(
    rentalInfoInstance,
    rentalInfoDaoInstance
  );
  return updateRentalList;
}

async function removeRental(rentalInfoInstance) {
  const removeRentalList = await db.rentalRemoveQuery(rentalInfoInstance);
  return removeRentalList;
}

module.exports = {
  createRental,
  getRental,
  getRentalById,
  updateRental,
  removeRental,
};
