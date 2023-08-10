const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertCustomer:
    " INSERT INTO customer (first_name, store_id, last_name, email, address_id, activebool, create_date, active) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
  gettingCustomer: "SELECT * FROM customer",
  findIdQuery: " SELECT customer_id FROM customer WHERE customer_id=$1 ",
  getCustomerById: "SELECT * FROM customer WHERE customer_id=$1 ",
  updateCustomerById:
    " UPDATE customer SET store_id =$1, first_name =$2, last_name =$3 WHERE customer_id =$4 RETURNING * ",
  removeCustomerById:
    " DELETE FROM customer WHERE customer_id =$1 RETURNING * ",
};

module.exports = { pool1, queries };
