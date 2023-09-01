const express = require("express");

const service = require("../service/rentalService");

const RentalInfoDao = require("../pojo/RentalInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const RentalInfoDaoInstance = new RentalInfoDao(req.body);
    const newRental = await service.createRental(RentalInfoDaoInstance);
    return res.json(newRental);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchRental = await service.getRental();
    return res.json(fetchRental);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:rental_id", async (req, res) => {
  try {
    const { rental_id } = req.params;
    const fetchRentalById = await service.getRentalById(req.params);
    return res.json(fetchRentalById);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:rental_id", async (req, res) => {
  try {
    const { rental_id } = req.params;
    const { rental_date, customer_id, return_date } = req.body;
    const modifyRental = await service.updateRental(req.params, req.body);
    return res.json(modifyRental);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:rental_id", async (req, res) => {
  try {
    const { rental_id } = req.params;
    const deleteRental = await service.removeRental(req.params);
    res.json(deleteRental);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
