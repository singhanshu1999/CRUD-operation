const db = require("../connector/storeDb");

async function createStore(StoreInfoDaoInstance) {
  const insertedStore = await db.storeCreateQuery(StoreInfoDaoInstance);
  return insertedStore;
}

async function getStore() {
  const gettedStore = await db.storeGetQuery();
  return gettedStore;
}

async function getStoreById(StoreInfoInstance) {
  const gettedStoreById = await db.storeGetByIdQuery(StoreInfoInstance);
  return gettedStoreById;
}

async function updateStore(StoreInfoInstance, StoreInfoDaoInstance) {
  const updatedStore = await db.storeUpdateQuery(
    StoreInfoInstance,
    StoreInfoDaoInstance
  );
  return updatedStore;
}

async function removeStore(StoreInfoInstance) {
  const removedStore = await db.storeRemoveQuery(StoreInfoInstance);
  return removedStore;
}

module.exports = {
  createStore,
  getStore,
  getStoreById,
  updateStore,
  removeStore,
};
