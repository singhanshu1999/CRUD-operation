const Joi = require("joi");

const createCustomerSchema = Joi.object({
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  store_id: Joi.number().integer().required(),
  last_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  email: Joi.string()
    .email()
    .pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)
    .required(),
  address_id: Joi.number().required(),
  activebool: Joi.string().required(),
  create_date: Joi.number().integer().required(),
  active: Joi.number().integer().required(),
});

const updateCustomerSchema = Joi.object({
  store_id: Joi.number().integer().required(),
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  last_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
};
