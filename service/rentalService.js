const db = require("../connector/rentalDb");

async function createRental(rentalInfoDaoInstance) {
  const insertedRental = await db.rentalCreateQuery(rentalInfoDaoInstance);
  return insertedRental;
}

async function getRental() {
  const gettedRental = await db.rentalGetQuery();
  return gettedRental;
}

async function getRentalById(rentalInfoInstance) {
  const gettedRentalById = await db.rentalGetByIdQuery(rentalInfoInstance);
  return gettedRentalById;
}

async function updateRental(rentalInfoInstance, rentalInfoDaoInstance) {
  const updatedRental = await db.rentalUpdateQuery(
    rentalInfoInstance,
    rentalInfoDaoInstance
  );
  return updatedRental;
}

async function removeRental(rentalInfoInstance) {
  const removedRental = await db.rentalRemoveQuery(rentalInfoInstance);
  return removedRental;
}

module.exports = {
  createRental,
  getRental,
  getRentalById,
  updateRental,
  removeRental,
};
