const express = require("express");

const service = require("../service/rentalService");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { rental_date, inventory_id, customer_id, return_date, staff_id } =
      req.body;
    const newRental = await service.createRental(
      rental_date,
      inventory_id,
      customer_id,
      return_date,
      staff_id
    );
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
    const fetchRentalById = await service.getRentalById(rental_id);
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
    const modifyRental = await service.updateRental(
      rental_id,
      rental_date,
      customer_id,
      return_date
    );
    return res.json(modifyRental);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:rental_id", async (req, res) => {
  try {
    const { rental_id } = req.params;
    const deleteRental = await service.removeRental(rental_id);
    res.json(deleteRental);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
