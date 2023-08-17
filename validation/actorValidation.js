const Joi = require("joi");

const createActorSchema = Joi.object({
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
  last_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

const updateActorSchema = Joi.object({
  first_name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required(),
});

module.exports = {
  createActorSchema,
  updateActorSchema,
};
