const db = require("../connector/customerDb");

async function createCustomer(customerInfoDaoInstance) {
  const insertCustomerList = await db.customerCreateQuery(
    customerInfoDaoInstance
  );
  return insertCustomerList;
}

async function getCustomer() {
  const getCustomerList = await db.customerGetQuery();
  return getCustomerList;
}

async function getCustomerById(customerInfoInstance) {
  const getCustomerListById = await db.customerGetByIdQuery(
    customerInfoInstance
  );
  return getCustomerListById;
}

async function updateCustomer(customerInfoInstance, customerInfoDaoInstance) {
  const updateCustomerList = await db.customerUpdateQuery(
    customerInfoInstance,
    customerInfoDaoInstance
  );
  return updateCustomerList;
}

async function removeCustomer(customerInfoInstance) {
  const removeCustomerList = await db.customerRemoveQuery(customerInfoInstance);
  return removeCustomerList;
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  removeCustomer,
};
