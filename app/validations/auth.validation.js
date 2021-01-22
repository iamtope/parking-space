import Joi from 'joi';
import {
  passwordSchema,
  nameSchema,
  emailValidate,
} from './generic.validation';

// signup schema
const signupSchema = Joi.object({
  firstName: nameSchema(Joi, 'firstName'),
  lastName: nameSchema(Joi, 'lastName'),
  email: emailValidate(Joi),
  password: passwordSchema(Joi),
}).options({ allowUnknown: true });;
// signin schema
const loginSchema = Joi.object({
  email: emailValidate(Joi),
  password: passwordSchema(Joi),
});

const changePasswordSchema = Joi.object({
  oldPassword: passwordSchema(Joi),
  newPassword: passwordSchema(Joi),
  email: emailValidate(Joi),
});

export { signupSchema, loginSchema, changePasswordSchema };
