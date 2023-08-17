const Joi = require("joi");

const createRentalSchema = Joi.object({
  rental_date: Joi.date().iso().required(),
  inventory_id: Joi.number().integer().required(),
  customer_id: Joi.number().integer().required(),
  return_date: Joi.date().iso().required(),
  staff_id: Joi.number().integer().required(),
});

const updateRentalSchema = Joi.object({
  rental_date: Joi.date().iso().required(),
  customer_id: Joi.number().integer().required(),
  return_date: Joi.date().iso().required(),
});

module.exports = {
  createRentalSchema,
  updateRentalSchema,
};
