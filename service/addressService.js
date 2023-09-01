const db = require("../connector/addressDb");

async function createAddress(AddressInfoDaoInstance) {
  const insertedAddress = await db.addressCreateQuery(AddressInfoDaoInstance);
  return insertedAddress;
}

async function getAddress() {
  const gettedAddress = await db.addressGetQuery();
  return gettedAddress;
}

async function getAddressById(AddressInfoInstance) {
  const gettedAddressById = await db.addressGetByIdQuery(AddressInfoInstance);
  return gettedAddressById;
}

async function updateAddress(AddressInfoInstance, AddressInfoDaoInstance) {
  const updatedAddress = await db.addressUpdateQuery(
    AddressInfoInstance,
    AddressInfoDaoInstance
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
