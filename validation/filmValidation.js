const Joi = require("joi");

const createFilmSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  release_year: Joi.number().integer().min(1990).max(2023),
  language_id: Joi.number().integer().required(),
  rental_duration: Joi.number().required(),
  rental_rate: Joi.number().required(),
  length: Joi.number().integer().required(),
  replacement_cost: Joi.number().required(),
  rating: Joi.string().required(),
  special_features: Joi.array().items(Joi.string()).required(),
});

const updateFilmSchema = Joi.object({
  description: Joi.string().required(),
  rental_duration: Joi.number().required(),
  rental_rate: Joi.number().required(),
});

module.exports = { createFilmSchema, updateFilmSchema };
