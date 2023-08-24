const express = require("express");

const service = require("../service/addressService");

const validation = require("../validation/addressValidation");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    /* const { error } = validation.createAddressSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }*/
    const { address, address2, district, city_id, postal_code, phone } =
      req.body;
    const newAddress = await service.createAddress(
      address,
      address2,
      district,
      city_id,
      postal_code,
      phone
    );
    res.json(newAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchAddress = await service.getAddress();
    res.json(fetchAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:address_id", async (req, res) => {
  try {
    const { address_id } = req.params;
    const fetchAddressById = await service.getAddressById(address_id);
    res.json(fetchAddressById);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:address_id", async (req, res) => {
  try {
    const { error } = validation.updateAddressSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { address_id } = req.params;
    const { address, address2, district } = req.body;
    const modifyAddress = await service.updateAddress(
      address_id,
      address,
      address2,
      district
    );
    res.json(modifyAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:address_id", async (req, res) => {
  try {
    const { address_id } = req.params;
    const deleteAddress = await service.removeAddress(address_id);
    res.json(deleteAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
