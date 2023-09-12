const express = require("express");

const service = require("../service/customerService");

const CustomerInfoDao = require("../pojo/CustomerInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const customerInfoDaoInstance = new CustomerInfoDao(req.body);
    const newCustomer = await service.createCustomer(customerInfoDaoInstance);
    return res.json(newCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchCustomer = await service.getCustomer();
    return res.json(fetchCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const fetchCustomerById = await service.getCustomerById(req.params);
    return res.json(fetchCustomerById);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { store_id, first_name, last_name } = req.body;
    const modifyCustomer = await service.updateCustomer(req.params, req.body);
    return res.json(modifyCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/remove/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const deleteCustomer = await service.removeCustomer(req.params);
    res.json(deleteCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
