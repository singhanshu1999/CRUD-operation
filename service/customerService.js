const db = require("../connector/customerDb");

async function createCustomer(customerInfoDaoInstance) {
  const insertedCustomer = await db.customerCreateQuery(
    customerInfoDaoInstance
  );
  return insertedCustomer;
}

async function getCustomer() {
  const gettedCustomer = await db.customerGetQuery();
  return gettedCustomer;
}

async function getCustomerById(customerInfoInstance) {
  const gettedCustomerById = await db.customerGetByIdQuery(
    customerInfoInstance
  );
  return gettedCustomerById;
}

async function updateCustomer(customerInfoInstance, customerInfoDaoInstance) {
  const updatedCustomer = await db.customerUpdateQuery(
    customerInfoInstance,
    customerInfoDaoInstance
  );
  return updatedCustomer;
}

async function removeCustomer(customerInfoInstance) {
  const removedCustomer = await db.customerRemoveQuery(customerInfoInstance);
  return removedCustomer;
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  removeCustomer,
};
