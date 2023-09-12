const express = require("express");

const service = require("../service/countryService");

const countryInfoDao = require("../pojo/countryInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const countryInfoDaoInstance = new countryInfoDao(req.body);
    const newCountry = await service.createCountry(countryInfoDaoInstance);
    res.json(newCountry);
  } catch (error) {
    console.error("Error while creating a country: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchCountry = await service.getCountry();
    res.json(fetchCountry);
  } catch (error) {
    console.error("Error while getting country: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:country_id", async (req, res) => {
  try {
    const { country_id } = req.params;
    const fetchCountryById = await service.getCountryById(req.params);
    res.json(fetchCountryById);
  } catch (error) {
    console.error("Error while getting country by id: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:country_id", async (req, res) => {
  try {
    const { country_id } = req.params;
    const { country_name } = req.body;
    const modifyCountry = await service.updateCountry(req.params, req.body);
    res.json(modifyCountry);
  } catch (error) {
    console.error("Error while updating country: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/remove/:country_id", async (req, res) => {
  try {
    const { country_id } = req.params;
    const deleteCountry = await service.removeCountry(req.params);
    res.json(deleteCountry);
  } catch (error) {
    console.error("Error while delete country: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
