const { Pool } = require("pg");

const pool1 = new Pool({
  user: "postgres",
  host: "localhost",
  database: "task1",
  password: "test",
  port: 5432,
});
const queries = {
  insertStore:
    " INSERT INTO store (manager_staff_id,address_id) VALUES ($1,$2) RETURNING *",
  gettingStore: "SELECT * FROM store",
  findIdQuery: " SELECT store_id FROM store WHERE store_id=$1 ",
  getStoreById: "SELECT * FROM store WHERE store_id =$1",
  updateStoreById:
    " UPDATE store SET address_id = $1 WHERE store_id = $2 RETURNING *",
  removeStoreById: " DELETE FROM store WHERE store_id = $1 RETURNING * ",
};

module.exports = { pool1, queries };
