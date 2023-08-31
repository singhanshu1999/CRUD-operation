const db = require("../connector/storeDb");

async function createStore(manager_staff_id, address_id) {
  const insertedStore = await db.storeCreateQuery(manager_staff_id, address_id);
  return insertedStore;
}

async function getStore() {
  const gettedStore = await db.storeGetQuery();
  return gettedStore;
}

async function getStoreById(store_id) {
  const gettedStoreById = await db.storeGetByIdQuery(store_id);
  return gettedStoreById;
}

async function updateStore(store_id, address_id) {
  const updatedStore = await db.storeUpdateQuery(store_id, address_id);
  return updatedStore;
}

async function removeStore(store_id) {
  const removedStore = await db.storeRemoveQuery(store_id);
  return removedStore;
}

module.exports = {
  createStore,
  getStore,
  getStoreById,
  updateStore,
  removeStore,
};
