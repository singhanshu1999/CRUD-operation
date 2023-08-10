const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertRental:
    " INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
  gettingRental: "SELECT * FROM rental",
  findIdQuery: " SELECT rental_id FROM rental WHERE rental_id=$1 ",
  getRentalById: "SELECT * FROM rental WHERE rental_id=$1 ",
  updateRentalById:
    " UPDATE rental SET rental_date=$1, customer_id=$2, return_date=$3 WHERE rental_id =$4 RETURNING *",
  removeRentalById: " DELETE FROM rental WHERE rental_id =$1 RETURNING * ",
};

module.exports = { pool1, queries };
