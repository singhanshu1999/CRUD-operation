const express = require("express");
const actorApi = require("../controller/actorController");
const addressApi = require("../controller/addressController");
const filmApi = require("../controller/filmController");
const customerApi = require("../controller/customerController");
const rentalApi = require("../controller/rentalController");
const staffApi = require("../controller/staffController");
const storeApi = require("../controller/storeController");
const cityApi = require("../controller/cityController");
const countryApi = require("../controller/countryController");

const app = express();
const port = 8000;

app.use(express.json());
app.use("/actor", actorApi);
app.use("/address", addressApi);
app.use("/film", filmApi);
app.use("/customer", customerApi);
app.use("/rental", rentalApi);
app.use("/staff", staffApi);
app.use("/store", storeApi);
app.use("/city", cityApi);
app.use("/country", countryApi);

app.listen(port, () => {
  console.log("server is running ", port);
});
