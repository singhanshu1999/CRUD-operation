const { Pool } = require("pg");

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
module.exports = { pool1, queries };
