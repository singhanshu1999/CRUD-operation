const db = require("../connector/rentalDb");

async function createRental(RentalInfoDaoInstance) {
  const insertedRental = await db.rentalCreateQuery(RentalInfoDaoInstance);
  return insertedRental;
}

async function getRental() {
  const gettedRental = await db.rentalGetQuery();
  return gettedRental;
}

async function getRentalById(rental_id) {
  const gettedRentalById = await db.rentalGetByIdQuery(rental_id);
  return gettedRentalById;
}

async function updateRental(rental_id, rental_date, customer_id, return_date) {
  const updatedRental = await db.rentalUpdateQuery(
    rental_id,
    rental_date,
    customer_id,
    return_date
  );
  return updatedRental;
}

async function removeRental(rental_id) {
  const removedRental = await db.rentalRemoveQuery(rental_id);
  return removedRental;
}

module.exports = {
  createRental,
  getRental,
  getRentalById,
  updateRental,
  removeRental,
};
