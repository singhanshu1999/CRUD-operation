const express = require("express");

const service = require("../service/addressService");

const AddressInfoDao = require("../pojo/AddressInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const AddressInfoDaoInstance = new AddressInfoDao(req.body);
    const newAddress = await service.createAddress(AddressInfoDaoInstance);
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
    const fetchAddressById = await service.getAddressById(req.params);
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
    const modifyAddress = await service.updateAddress(req.params, req.body);
    res.json(modifyAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:address_id", async (req, res) => {
  try {
    const { address_id } = req.params;
    const deleteAddress = await service.removeAddress(req.params);
    res.json(deleteAddress);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
