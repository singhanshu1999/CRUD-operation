const express = require("express");

const service = require("../service/filmService");

const validation = require("../validation/filmValidation");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    /* const { error } = validation.createFilmSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }*/
    const {
      title,
      description,
      release_year,
      language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features,
    } = req.body;
    const newFilm = await service.createFilm(
      title,
      description,
      release_year,
      language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features
    );
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
    const fetchFilmById = await service.getFilmById(film_id);
    res.json(fetchFilmById);
  } catch (error) {
    console.error("error while fetching the film", error);
    res.status(500).json({ error: "error" });
  }
});

router.put("/update/:film_id", async (req, res) => {
  try {
    /*const { error } = validation.createFilmSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }*/
    const { film_id } = req.params;
    const { description, rental_duration, rental_rate } = req.body;
    const modifyFilm = await service.updateFilm(
      film_id,
      description,
      rental_duration,
      rental_rate
    );
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
    const deleteFilm = await service.removeFilm(film_id);
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