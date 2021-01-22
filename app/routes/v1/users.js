import { Router } from 'express';
import AuthController from '../../controllers/auth';
import AuthMiddleWare from '../../middlewares/auth';

const {
  checkIfUserAlreadyExist,
  validateSignupFields,
  validateLoginFields,
  fetchUserByEmail,
  checkIfDisabled
} = AuthMiddleWare;
const { signUpUser, loginUser } = AuthController;


const userRouter = Router();

userRouter.post(
  '/signup',
  validateSignupFields,
  checkIfUserAlreadyExist,
  signUpUser
);
userRouter.post('/login', validateLoginFields, fetchUserByEmail, checkIfDisabled, loginUser);

export default userRouter;
