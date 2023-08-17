const Joi = require("joi");

const createAddressSchema = Joi.object({
  address: Joi.string().required(),
  address2: Joi.string(),
  district: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  city_id: Joi.number().integer().required(),
  postal_code: Joi.number().integer(6).required(),
  phone: Joi.number().integer(10).required(),
});

const updateAddressSchema = Joi.object({
  address: Joi.string().required(),
  address2: Joi.string(),
  district: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

module.exports = {
  createAddressSchema,
  updateAddressSchema,
};
