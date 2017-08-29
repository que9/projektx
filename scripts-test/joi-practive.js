const joi = require('joi')
// const schema = Joi.object().keys({
//     username: Joi.string().alphanum().min(3).max(30).default('anom'),
//     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//     access_token: [Joi.string(), Joi.number()],
//     birthyear: Joi.number().integer().min(1900).max(2013),
//     email: Joi.string().email()
// }).with('username', 'birthyear').without('password', 'access_token');

const logSchema = joi.object({
  LOG_LEVEL: joi.string()
        .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
        .default('debug'),
  LOG_ENABLED: joi.boolean()
        .truthy('TRUE').truthy('true')
        .falsy('FALSE').falsy('false')
        .default('true')
}).unknown().required()

// const result = Joi.validate(process.env, envVarsSchema);
const {error, value: logs } = joi.validate(process.env, logSchema)

// var {error, value:data } = result;
// result.error === null -> valid
console.log('e', error)
const logConfig = {
  logger: {
    level: logs.LOG_LEVEL,
    enabled: logs.LOG_ENABLED
  }
}
console.log('\n---', logConfig)
