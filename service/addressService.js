const db = require("../connector/addressDb");

async function createAddress(addressInfoDaoInstance) {
  const insertAddressList = await db.addressCreateQuery(addressInfoDaoInstance);
  return insertAddressList;
}

async function getAddress() {
  const getAddressList = await db.addressGetQuery();
  return getAddressList;
}

async function getAddressById(addressInfoInstance) {
  const getAddressListById = await db.addressGetByIdQuery(addressInfoInstance);
  return getAddressListById;
}

async function updateAddress(addressInfoInstance, addressInfoDaoInstance) {
  const updateAddressList = await db.addressUpdateQuery(
    addressInfoInstance,
    addressInfoDaoInstance
  );
  return updateAddressList;
}

async function removeAddress(addressInfoInstance) {
  const removeAddressList = await db.addressRemoveQuery(addressInfoInstance);
  return removeAddressList;
}

module.exports = {
  getAddress,
  getAddressById,
  createAddress,
  updateAddress,
  removeAddress,
};
