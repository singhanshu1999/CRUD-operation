const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});

const queries = {
  insertAddress:
    "INSERT INTO address(address, address2, district, city_id, postal_code, phone) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
  gettingAddress: "SELECT * FROM address",
  findIdQuery: " SELECT address_id FROM address WHERE address_id=$1 ",
  getAddressById: "SELECT * FROM address WHERE address_id=$1",
  updateAddressById:
    "UPDATE address SET address =$1, address2 =$2, district =$3 WHERE address_id =$4 RETURNING *",
  removeAddressById: " DELETE FROM address WHERE address_id = $1 RETURNING * ",
};

module.exports = { pool1, queries };
