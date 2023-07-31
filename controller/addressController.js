const express = require("express");

const service = require("../service/addressService.js");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
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
    const { address_id } = req.params;
    const { address, address2, district } = req.body;
    const modifyAddress = await service.updateAddress(
      address_id,
      address,
      address2,
      district
    );
    if (!modifyAddress) {
      console.log("address id is invalid");
    }
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
    if (!deleteAddress) {
      console.log("address id id invalid");
    }
    res.json(deleteAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
