import { Router } from 'express';
import AuthController from '../../controllers/auth';
import AuthMiddleWare from '../../middlewares/auth';
import UserController from '../../controllers/users';

const {
  checkIfUserAlreadyExist,
  validateSignupFields,
  fetchUserByEmail,
} = AuthMiddleWare;
const { signUpAdmin } = AuthController;
const {
  disableUser,
  saveParkingSpace,
  assignSpaceToUser,
  unassignSpace,
  getSpaceByUser,
  getAvailableSpaces
} = UserController;

const adminRouter = Router();

adminRouter.post(
  '/signup',
  validateSignupFields,
  checkIfUserAlreadyExist,
  signUpAdmin
);
adminRouter.put('/delete/user', fetchUserByEmail, disableUser);
adminRouter.post('/create/space', saveParkingSpace);
adminRouter.post('/assign/user/', assignSpaceToUser)
adminRouter.post('/unassign/user/', unassignSpace)
adminRouter.post('/unassign/user/:id', unassignSpace)
adminRouter.get('/space/:user_id', getSpaceByUser)
adminRouter.get('/available/space', getAvailableSpaces)

export default adminRouter;
