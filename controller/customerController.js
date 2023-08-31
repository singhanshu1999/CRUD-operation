const express = require("express");

const service = require("../service/customerService");

const CustomerInfoDao = require("../pojo/CustomerInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const CustomerInfoDaoInstance = new CustomerInfoDao(req.body);
    const newCustomer = await service.createCustomer(CustomerInfoDaoInstance);
    return res.json(newCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchCustomer = await service.getCustomer();
    return res.json(fetchCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const fetchCustomerById = await service.getCustomerById(customer_id);
    return res.json(fetchCustomerById);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { store_id, first_name, last_name } = req.body;
    const modifyCustomer = await service.updateCustomer(
      customer_id,
      store_id,
      first_name,
      last_name
    );
    return res.json(modifyCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const deleteCustomer = await service.removeCustomer(customer_id);
    res.json(deleteCustomer);
  } catch (error) {
    console.error("error while fetching the address", error);
    res.status(500).json({ error: "error" });
  }
});
module.exports = router;
