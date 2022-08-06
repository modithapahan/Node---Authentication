/* Validation */
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.object(data,schema);
}

const loginValidation = (data) => {
    const schema = {
    
        // Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    // })
    }
    return Joi.object(data,schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;