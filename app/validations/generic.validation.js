/**
 * Validates a string input field
 * @param { Object } joi - Joi object.
 * @param { String } field - Field to be validated.
 * @returns { Object } A Joi validation schema.
 */
const nameSchema = (joi, field) => joi
  .string()
  .required()
  .trim()
  .min(2)
  .max(30)
  .messages({
    'string.base': `The ${field} field parameter must be a string`,
    'string.empty': `The ${field} field cannot be an empty string`,
    'string.max': `${field} should not be more than 30 characters`,
    'string.min': `${field} should not be less than 2 characters`,
  });

/**
 * Validates a passwords input field
 * @param { Object } Joi - Joi object.
 * @param { String } field - Field to be validated.
 * @returns { Object } A Joi validation schema.
 */
const passwordSchema = (Joi) => Joi.string()
  .trim()
  .required()
  .pattern(new RegExp('^[a-zA-Z0-9@#%$!+:_|-]{5,30}$'))
  .messages({
    'string.base': 'Password must be a valid string',
    'string.empty': 'Password field cannot be empty',
    'any.required':
        'Password field is required else password cannot be updated',
    'object.pattern.match':
        'The only validate combinations are numbers, alphabets, and these characters: a-zA-Z0-9@#%$!+:_|-',
  });

/**
 * Validates an email
 * @param { Object } Joi - Joi object.
 * @param { String } field - Field to be validated.
 * @returns { Object } A Joi validation schema.
 */
const emailValidate = (Joi) => Joi.string().email().trim().required()
  .messages({
    'string.base': 'Email must be a valid string',
    'string.empty': 'Email field cannot be empty',
    'any.required': 'Email Address must be provided',
  });

export { nameSchema, passwordSchema, emailValidate };
