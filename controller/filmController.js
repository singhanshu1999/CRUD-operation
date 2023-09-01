const express = require("express");

const service = require("../service/filmService");

const FilmInfoDao = require("../pojo/FilmInfo");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const FilmInfoDaoInstance = new FilmInfoDao(req.body);
    const newFilm = await service.createFilm(FilmInfoDaoInstance);
    return res.json(newFilm);
  } catch (error) {
    console.error("error while fetching the film", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchFilm = await service.getFilm();
    res.json(fetchFilm);
  } catch (error) {
    console.error("error while fetching the film", error);
    res.status(500).json({ error: "error" });
  }
});

router.get("/:film_id", async (req, res) => {
  try {
    const { film_id } = req.params;
    const fetchFilmById = await service.getFilmById(req.params);
    res.json(fetchFilmById);
  } catch (error) {
    console.error("error while fetching the film", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:film_id", async (req, res) => {
  try {
    const { film_id } = req.params;
    const { description, rental_duration, rental_rate } = req.body;
    const modifyFilm = await service.updateFilm(req.params, req.body);
    if (!modifyFilm) {
      console.log("Film id is invalid");
    }
    res.json(modifyFilm);
  } catch (error) {
    console.error("error while fetching the film", error);
    res.status(500).json({ error: "error" });
  }
});

router.delete("/remove/:film_id", async (req, res) => {
  try {
    const { film_id } = req.params;
    const deleteFilm = await service.removeFilm(req.params);
    if (!deleteFilm) {
      console.log("Film id id invalid");
    }
    res.json(deleteFilm);
  } catch (error) {
    console.error("error while fetching the film", error);
    res.status(500).json({ error: "error" });
  }
});

module.exports = router;
