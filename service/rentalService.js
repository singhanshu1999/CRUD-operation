const db = require("../connector/rentalDb");

async function createRental(RentalInfoDaoInstance) {
  const insertedRental = await db.rentalCreateQuery(RentalInfoDaoInstance);
  return insertedRental;
}

async function getRental() {
  const gettedRental = await db.rentalGetQuery();
  return gettedRental;
}

async function getRentalById(RentalInfoInstance) {
  const gettedRentalById = await db.rentalGetByIdQuery(RentalInfoInstance);
  return gettedRentalById;
}

async function updateRental(RentalInfoInstance, RentalInfoDaoInstance) {
  const updatedRental = await db.rentalUpdateQuery(
    RentalInfoInstance,
    RentalInfoDaoInstance
  );
  return updatedRental;
}

async function removeRental(RentalInfoInstance) {
  const removedRental = await db.rentalRemoveQuery(RentalInfoInstance);
  return removedRental;
}

module.exports = {
  createRental,
  getRental,
  getRentalById,
  updateRental,
  removeRental,
};
