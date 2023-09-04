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

async function staffCreateQuery(staffInfoDaoInstance) {
  try {
    const { error } =
      validation.createStaffSchema.validate(staffInfoDaoInstance);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return;
    }
    const createQuery = queries.insertStaff;
    const values = [
      staffInfoDaoInstance.first_name,
      staffInfoDaoInstance.last_name,
      staffInfoDaoInstance.address_id,
      staffInfoDaoInstance.email,
      staffInfoDaoInstance.store_id,
      staffInfoDaoInstance.active,
      staffInfoDaoInstance.username,
      staffInfoDaoInstance.password,
    ];
    const client = await pool1.connect();
    const result = await client.query(createQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in staffCreateQuery:", error.message);
    return null;
  }
}

async function staffGetQuery() {
  try {
    const getQuery = queries.gettingStaff;
    const client = await pool1.connect();
    const result = await client.query(getQuery);
    return result.rows;
  } catch (error) {
    console.error("Error in staffGetQuery:", error.message);
    return null;
  }
}

async function staffGetByIdQuery(staffInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      staffInfoInstance.staff_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("staff id is not valid!!");
    }
    const getByIdQuery = queries.getStaffById;
    const values = [staffInfoInstance.staff_id];
    const result = await client.query(getByIdQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in staffGetByIdQuery:", error.message);
    return null;
  }
}

async function staffUpdateQuery(staffInfoInstance, staffInfoDaoInstance) {
  try {
    const { error } =
      validation.updateStaffSchema.validate(staffInfoDaoInstance);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return;
    }
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      staffInfoInstance.staff_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("staff id is not valid!!");
    }
    const updateQuery = queries.updateStaffById;
    const values = [
      staffInfoDaoInstance.first_name,
      staffInfoDaoInstance.username,
      staffInfoDaoInstance.password,
      staffInfoInstance.staff_id,
    ];
    const result = await client.query(updateQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in staffUpdateQuery:", error.message);
    return null;
  }
}

async function staffRemoveQuery(staffInfoInstance) {
  try {
    const checkQuery = queries.findIdQuery;
    const client = await pool1.connect();
    const checkResult = await client.query(checkQuery, [
      staffInfoInstance.staff_id,
    ]);
    if (checkResult.rows.length === 0) {
      throw new Error("staff id is not valid!!");
    }
    const removeQuery = queries.removeStaffById;
    const values = [staffInfoInstance.staff_id];
    const result = await client.query(removeQuery, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in staffRemoveQuery:", error.message);
    return null;
  }
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
