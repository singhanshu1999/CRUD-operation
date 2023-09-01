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

async function staffCreateQuery(StaffInfoDaoInstance) {
  const { error } = validation.createStaffSchema.validate(StaffInfoDaoInstance);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const createQuery = queries.insertStaff;
  const values = [
    StaffInfoDaoInstance.first_name,
    StaffInfoDaoInstance.last_name,
    StaffInfoDaoInstance.address_id,
    StaffInfoDaoInstance.email,
    StaffInfoDaoInstance.store_id,
    StaffInfoDaoInstance.active,
    StaffInfoDaoInstance.username,
    StaffInfoDaoInstance.password,
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

async function staffGetByIdQuery(StaffInfoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    StaffInfoInstance.staff_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const getByIdQuery = queries.getStaffById;
  const values = [StaffInfoInstance.staff_id];
  const result = await client.query(getByIdQuery, values);
  return result.rows[0];
}

async function staffUpdateQuery(StaffInfoInstance, StaffInfoDaoInstance) {
  const { error } = validation.updateStaffSchema.validate(StaffInfoDaoInstance);
  if (error) {
    console.error("Validation error:", error.details[0].message);
    return;
  }
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    StaffInfoInstance.staff_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const updateQuery = queries.updateStaffById;
  const values = [
    StaffInfoDaoInstance.first_name,
    StaffInfoDaoInstance.username,
    StaffInfoDaoInstance.password,
    StaffInfoInstance.staff_id,
  ];
  const result = await client.query(updateQuery, values);
  return result.rows[0];
}

async function staffRemoveQuery(StaffInfoInstance) {
  const checkQuery = queries.findIdQuery;
  const client = await pool1.connect();
  const checkResult = await client.query(checkQuery, [
    StaffInfoInstance.staff_id,
  ]);
  if (checkResult.rows.length === 0) {
    throw new Error("staff id is not valid!!");
  }
  const removeQuery = queries.removeStaffById;
  const values = [StaffInfoInstance.staff_id];
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
