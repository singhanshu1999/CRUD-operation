const db = require("../connector/storeDb");

async function createStore(storeInfoDaoInstance) {
  const insertStoreList = await db.storeCreateQuery(storeInfoDaoInstance);
  return insertStoreList;
}

async function getStore() {
  const getStoreList = await db.storeGetQuery();
  return getStoreList;
}

async function getStoreById(storeInfoInstance) {
  const getStoreListById = await db.storeGetByIdQuery(storeInfoInstance);
  return getStoreListById;
}

async function updateStore(storeInfoInstance, storeInfoDaoInstance) {
  const updateStoreList = await db.storeUpdateQuery(
    storeInfoInstance,
    storeInfoDaoInstance
  );
  return updateStoreList;
}

async function removeStore(storeInfoInstance) {
  const removeStoreList = await db.storeRemoveQuery(storeInfoInstance);
  return removeStoreList;
}

module.exports = {
  createStore,
  getStore,
  getStoreById,
  updateStore,
  removeStore,
};
