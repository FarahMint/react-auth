const Joi = require('@hapi/joi');


// REGISTER VALIDATION
// create schema for  register validation
 const  registerValidation = (data)=>{
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    };
      return Joi.validate(data,schema );
}; 
// END REGISTER VALIDATION


// LOGIN VALIDATION
// create schema for  LOGIN validation
  const loginValidation = (data)=>{
    const schema = {
        email: Joi.string().min(6).required().email({ minDomainSegments: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    };
      return Joi.validate(data,schema );
}; 
// END LOGIN VALIDATION

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;