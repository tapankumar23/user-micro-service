const Joi = require('joi')

const user_validations={
    generate_otp_payload : Joi.object({
        email: Joi.string().email().required(),
        headers: Joi.object({
          'authorization': Joi.string().required()
        }).options({allowUnknown: true})
      }),
    varify_otp_payload: Joi.object({
        otp: Joi.string().regex(/^\d{6}$/).required(),
        headers: Joi.object({
          'authorization': Joi.string().required()
        }).options({allowUnknown: true})
      }),
    user_payload : Joi.object({
        name: Joi.string().min(3).max(30).required(),
        age:  Joi.number().min(0), 
        email: Joi.string().email().required(),
        password: Joi.string()
        .min(6)
        .max(255)
        // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/)
        .regex(/^(?!.*password).*$/).required()
      }),
    user_login_payload : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
        .min(6)
        .max(255)
        // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/)
        .regex(/^(?!.*password).*$/).required()
      }),
    user_updation_payload : Joi.object({
        name: Joi.string(),
        age: Joi.number(),
        password: Joi.string(),
      }).unknown(false) 

}

module.exports = user_validations
