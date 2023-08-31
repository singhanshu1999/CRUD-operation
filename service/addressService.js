const db = require("../connector/addressDb");

async function createAddress(AddressInfoDaoInstance) {
  const insertedAddress = await db.addressCreateQuery(AddressInfoDaoInstance);
  return insertedAddress;
}

async function getAddress() {
  const gettedAddress = await db.addressGetQuery();
  return gettedAddress;
}

async function getAddressById(address_id) {
  const gettedAddressById = await db.addressGetByIdQuery(address_id);
  return gettedAddressById;
}

async function updateAddress(address_id, address, address2, district) {
  const updatedAddress = await db.addressUpdateQuery(
    address_id,
    address,
    address2,
    district
  );
  return updatedAddress;
}

async function removeAddress(address_id) {
  const removedAddress = await db.addressRemoveQuery(address_id);
  return removedAddress;
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
};
