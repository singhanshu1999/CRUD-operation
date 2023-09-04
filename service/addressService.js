const db = require("../connector/addressDb");

async function createAddress(addressInfoDaoInstance) {
  const insertedAddress = await db.addressCreateQuery(addressInfoDaoInstance);
  return insertedAddress;
}

async function getAddress() {
  const gettedAddress = await db.addressGetQuery();
  return gettedAddress;
}

async function getAddressById(addressInfoInstance) {
  const gettedAddressById = await db.addressGetByIdQuery(addressInfoInstance);
  return gettedAddressById;
}

async function updateAddress(addressInfoInstance, addressInfoDaoInstance) {
  const updatedAddress = await db.addressUpdateQuery(
    addressInfoInstance,
    addressInfoDaoInstance
  );
  return updatedAddress;
}

async function removeAddress(addressInfoInstance) {
  const removedAddress = await db.addressRemoveQuery(addressInfoInstance);
  return removedAddress;
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
};
