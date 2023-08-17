const express = require("express");

const service = require("../service/customerService");

const validation = require("../validation/customerValidation");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { error } = validation.createCustomerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const {
      first_name,
      store_id,
      last_name,
      email,
      address_id,
      activebool,
      create_date,
      active,
    } = req.body;
    const newCustomer = await service.createCustomer(
      first_name,
      store_id,
      last_name,
      email,
      address_id,
      activebool,
      create_date,
      active
    );
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
    const { error } = validation.createCustomerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { customer_id } = req.params;
    const { store_id, first_name, last_name } = req.body;
    /*  if (!Number.isInteger(store_id)) {
      return res.status(400).json({ error: "store_id must be an integer" });
    }

    if (typeof first_name !== "string" || typeof last_name !== "string") {
      return res
        .status(400)
        .json({ error: "first_name and last_name must be strings" });
    }*/
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
