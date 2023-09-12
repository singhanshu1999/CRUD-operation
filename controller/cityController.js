const express = require("express");

const router = express.Router();

const cityInfoDao = require("../pojo/cityInfo");

const service = require("../service/cityService");

router.post("/create", async (req, res) => {
  try {
    const cityInfoDaoInstance = new cityInfoDao(req.body);
    const newCity = await service.createCity(cityInfoDaoInstance);
    res.json(newCity);
  } catch (error) {
    console.error("Error while creating a city: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchCity = await service.getCity();
    res.json(fetchCity);
  } catch (error) {
    console.error("Error while fetching city: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:city_id", async (req, res) => {
  try {
    const { city_id } = req.params;
    const fetchCityById = await service.getCityById(req.params);
    res.json(fetchCityById);
  } catch (error) {
    console.error("Error while fetching city by id: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:city_id", async (req, res) => {
  try {
    const { city_id } = req.params;
    const { city } = req.body;
    const modifyCity = await service.updateCity(req.params, req.body);
    res.json(modifyCity);
  } catch (error) {
    console.error("Error while updating city: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/remove/:city_id", async (req, res) => {
  try {
    const { city_id } = req.params;
    const deleteCity = await service.removeCity(req.params);
    res.json(deleteCity);
  } catch (error) {
    console.error("error while deleting the address", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
