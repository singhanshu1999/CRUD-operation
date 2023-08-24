const { Pool } = require("pg");

const validation = require("../validation/staffValidation");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertStaff:
    "INSERT INTO staff (first_name, last_name, address_id, email, store_id, active, username, password) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",
  gettingStaff: "SELECT * FROM staff",
  findIdQuery: " SELECT staff_id FROM staff WHERE staff_id=$1 ",
  getStaffById: "SELECT * FROM staff WHERE staff_id=$1",
  updateStaffById:
    "UPDATE staff SET first_name =$1, username =$2, password =$3 WHERE staff_id =$4 RETURNING *",
  removeStaffById: " DELETE FROM staff WHERE staff_id = $1 RETURNING * ",
};

async function staffCreateQuery(
  first_name,
  last_name,
  address_id,
  email,
  store_id,
  active,
  username,
  password
) {
  const { error } = validation.createStaffSchema.validate({
    first_name,
    last_name,
    address_id,
    email,
    store_id,
    active,
    username,
    password,
  });
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const createQuery = queries.insertStaff;
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
  const client = await pool1.connect();
  const result = await client.query(createQuery, values);
  return result.rows[0];
}

async function staffGetQuery() {
  const getQuery = queries.gettingStaff;
  const client = await pool1.connect();
  const result = await client.query(getQuery);
  return result.rows;
}

async function staffGetByIdQuery(staff_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [staff_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const getByIdQuery = queries.getStaffById;
  const values = [staff_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function staffUpdateQuery(staff_id, first_name, username, password) {
  const { error } = validation.updateStaffSchema.validate({
    first_name,
    username,
    password,
  });
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [staff_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const updateQuery = queries.updateStaffById;
  const values = [first_name, username, password, staff_id];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function staffRemoveQuery(staff_id) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [staff_id]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const removeQuery = queries.removeStaffById;
  const values = [staff_id];
  const result = await client.query(removeQuery, values);
  return result.rows[0];
}

module.exports = {
  pool1,
  queries,
  staffCreateQuery,
  staffGetQuery,
  staffGetByIdQuery,
  staffUpdateQuery,
  staffRemoveQuery,
};
