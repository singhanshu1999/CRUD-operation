const db = require("../connector/storeDb");

async function createStore(storeInfoDaoInstance) {
  const insertedStore = await db.storeCreateQuery(storeInfoDaoInstance);
  return insertedStore;
}

async function getStore() {
  const gettedStore = await db.storeGetQuery();
  return gettedStore;
}

async function getStoreById(storeInfoInstance) {
  const gettedStoreById = await db.storeGetByIdQuery(storeInfoInstance);
  return gettedStoreById;
}

async function updateStore(storeInfoInstance, storeInfoDaoInstance) {
  const updatedStore = await db.storeUpdateQuery(
    storeInfoInstance,
    storeInfoDaoInstance
  );
  return updatedStore;
}

async function removeStore(storeInfoInstance) {
  const removedStore = await db.storeRemoveQuery(storeInfoInstance);
  return removedStore;
}

module.exports = {
  createStore,
  getStore,
  getStoreById,
  updateStore,
  removeStore,
};
