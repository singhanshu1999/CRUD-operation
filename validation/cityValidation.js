const Joi = require("joi");

const createCitySchema = Joi.object({
  city_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  country_id: Joi.number().integer().required(),
});

const updateCitySchema = Joi.object({
  city_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

module.exports = {
  createCitySchema,
  updateCitySchema,
};
