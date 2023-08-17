const db = require("../connector/staffDb");

async function createStaff(
  first_name,
  last_name,
  address_id,
  email,
  store_id,
  active,
  username,
  password
) {
  const createQuery = db.queries.insertStaff;
  const values = [
    first_name,
    last_name,
    address_id,
    email,
    store_id,
    active,
    username,
    password,
  ];
  const client = await db.pool1.connect();
  const result = await client.query(createQuery, values);
  return result.rows[0];
}

async function getStaff() {
  const getQuery = db.queries.gettingStaff;
  const client = await db.pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function getStaffById(staff_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [staff_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const getByIdQuery = db.queries.getStaffById;
  const values = [staff_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function updatestaff(staff_id, first_name, username, password) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [staff_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const updateQuery = db.queries.updateStaffById;
  const values = [first_name, username, password, staff_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function removeStaff(staff_id) {
  const checkQuery = db.queries.findIdQuery;
  const client = await db.pool1.connect();
  const checkResult = await client.query(checkQuery, [staff_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const removeQuery = db.queries.removeStaffById;
  const values = [staff_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  createStaff,
  getStaff,
  getStaffById,
  updatestaff,
  removeStaff,
};
