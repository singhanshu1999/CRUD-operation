const Joi = require("joi");

const createCountrySchema = Joi.object({
  country_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

const updateCountrySchema = Joi.object({
  country_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

module.exports = {
  createCountrySchema,
  updateCountrySchema,
};
