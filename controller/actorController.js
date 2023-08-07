const express = require("express");

const service = require("../service/actorService");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const createActor = await service.createUser(first_name, last_name);
    res.json(createActor);
  } catch (error) {
    console.error("Error ehile creating record:", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchUsers = await service.getUser();
    res.json(fetchUsers);
  } catch (error) {
    console.error("error while retrieving the data", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:actor_id", async (req, res) => {
  try {
    const { actor_id } = req.params;
    const fetchUsersById = await service.getUserById(actor_id);
    res.json(fetchUsersById);
  } catch (error) {
    console.error("error while retrieving the data", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:actor_id", async (req, res) => {
  try {
    const { actor_id } = req.params;
    const { first_name } = req.body;
    const updateActor = await service.updateUser(actor_id, first_name);
    if (!updateActor) {
      console.log("actor id is invalid");
    }
    res.json(updateActor);
  } catch (error) {
    console.error("Error while updating record:", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:actor_id", async (req, res) => {
  try {
    const { actor_id } = req.params;
    const removeActor = await service.removeUser(actor_id);
    if (!removeActor) {
      console.log("actor_id is invalid");
    }
    res.json(removeActor);
  } catch (error) {
    console.error("erroe while deleting the record", error);
    req.status(500).json({ error: "error" });
  }
});

module.exports = router;
