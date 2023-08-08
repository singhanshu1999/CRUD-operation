const express = require("express");
const actorApi = require("../controller/actorController");
const addressApi = require("../controller/addressController");
const filmApi = require("../controller/filmController");
const customerApi = require("../controller/customerController");
const rentalApi = require("../controller/rentalController");

const app = express();
const port = 8000;

app.use(express.json());
app.use("/actor", actorApi);
app.use("/address", addressApi);
app.use("/film", filmApi);
app.use("/customer", customerApi);
app.use("/rental", rentalApi);

app.listen(port, () => {
  console.log("server is running ", port);
});
