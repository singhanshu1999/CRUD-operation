const db = require("../connector/customerDb");

async function createCustomer(CustomerInfoDaoInstance) {
  const insertedCustomer = await db.customerCreateQuery(
    CustomerInfoDaoInstance
  );
  return insertedCustomer;
}

async function getCustomer() {
  const gettedCustomer = await db.customerGetQuery();
  return gettedCustomer;
}

async function getCustomerById(CustomerInfoInstance) {
  const gettedCustomerById = await db.customerGetByIdQuery(
    CustomerInfoInstance
  );
  return gettedCustomerById;
}

async function updateCustomer(CustomerInfoInstance, CustomerInfoDaoInstance) {
  const updatedCustomer = await db.customerUpdateQuery(
    CustomerInfoInstance,
    CustomerInfoDaoInstance
  );
  return updatedCustomer;
}

async function removeCustomer(CustomerInfoInstance) {
  const removedCustomer = await db.customerRemoveQuery(CustomerInfoInstance);
  return removedCustomer;
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  removeCustomer,
};
