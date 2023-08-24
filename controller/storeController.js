const express = require("express");

const service = require("../service/storeService");

//const validation = require("../validation/actorValidation");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { manager_staff_id, address_id } = req.body;
    const newStore = await service.createStore(manager_staff_id, address_id);
    res.json(newStore);
  } catch (error) {
    console.error("Error while creating store:", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchStore = await service.getStore();
    res.json(fetchStore);
  } catch (error) {
    console.error("error while retrieving the store data", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:store_id", async (req, res) => {
  try {
    const { store_id } = req.params;
    const fetchStoreById = await service.getStoreById(store_id);
    res.json(fetchStoreById);
  } catch (error) {
    console.error("error while retrieving the store data", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:store_id", async (req, res) => {
  try {
    const { store_id } = req.params;
    const { address_id } = req.body;
    const modifyStore = await service.updateStore(store_id, address_id);
    res.json(modifyStore);
  } catch (error) {
    console.error("Error while updating store data:", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:store_id", async (req, res) => {
  try {
    const { store_id } = req.params;
    const deleteStore = await service.removeStore(store_id);
    res.json(deleteStore);
  } catch (error) {
    console.error("error while deleting the store data", error);
    req.status(500).json({ error: "error" });
  }
});

module.exports = router;