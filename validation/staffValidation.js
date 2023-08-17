const Joi = require("joi");

const createStaffSchema = Joi.object({
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  last_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  address_id: Joi.number().required(),
  email: Joi.string().email().required(),
  store_id: Joi.number().integer().required(),
  active: Joi.string().required(),
  username: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  password: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-z0-9]+$/),
});
const updateStaffSchema = Joi.object({
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  username: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  password: Joi.string()
    .min(3)
    .max(40)
    .pattern(/^[a-zA-z0-9]+$/),
});
module.exports = {
  createStaffSchema,
  updateStaffSchema,
};
