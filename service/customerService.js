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

async function getCustomerById(customer_id) {
  const gettedCustomerById = await db.customerGetByIdQuery(customer_id);
  return gettedCustomerById;
}

async function updateCustomer(customer_id, store_id, first_name, last_name) {
  const updatedCustomer = await db.customerUpdateQuery(
    customer_id,
    store_id,
    first_name,
    last_name
  );
  return updatedCustomer;
}

async function removeCustomer(customer_id) {
  const removedCustomer = await db.customerRemoveQuery(customer_id);
  return removedCustomer;
}

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  removeCustomer,
};
