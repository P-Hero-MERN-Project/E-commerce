const Joi = require('joi');

const SignupFormSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
}) 

module.exports = SignupFormSchema;