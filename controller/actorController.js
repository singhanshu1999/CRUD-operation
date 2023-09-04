const express = require("express");

const service = require("../service/actorService");

const ActorInfoDao = require("../pojo/ActorInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const actorInfoDaoInstance = new ActorInfoDao(req.body);
    const newActor = await service.createActor(actorInfoDaoInstance);
    res.json(newActor);
  } catch (error) {
    console.error("Error while creating record:", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchActor = await service.getActor();
    res.json(fetchActor);
  } catch (error) {
    console.error("error while retrieving the data", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:actor_id", async (req, res) => {
  try {
    const { actor_id } = req.params;
    const fetchActorById = await service.getActorById(req.params);
    res.json(fetchActorById);
  } catch (error) {
    console.error("error while retrieving the data", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:actor_id", async (req, res) => {
  try {
    const { actor_id } = req.params;
    const { first_name } = req.body;
    const modifyActor = await service.updateActor(req.params, req.body);
    res.json(modifyActor);
  } catch (error) {
    console.error("Error while updating record:", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:actor_id", async (req, res) => {
  try {
    const { actor_id } = req.params;
    const deleteActor = await service.removeActor(req.params);
    res.json(deleteActor);
  } catch (error) {
    console.error("erroe while deleting the record", error);
    req.status(500).json({ error: "error" });
  }
});

module.exports = router;
