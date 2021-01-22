import { Helper, constants, genericErrors } from '../../utils';
import UserService from '../../services/user';

const {
  DISABLE_USER_SUCCESSFUL,
  SAVE_PARKING_SPACE_SUCCESSFUL,
  ASSIGN_SPACE_SUCCESSFUL,
  UNASSIGN_SPACE_SUCCESSFUL,
  GET_SPACE_SUCCESSFUL,
  GET_FREE_SPACE_SUCCESSFUL
} = constants;
const { successResponse, errorResponse } = Helper;
const { serverError } = genericErrors;

/**
 * Contain several methods that authenticate user and the response they recieve
 */
class UserController {
  /**
   * Disable user
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle
   * @memberof UserController
   */
  static async disableUser(req, res, next) {
    try {
      await UserService.disableUser(req.body.email);
      return successResponse(res, {
        code: 200,
        message: DISABLE_USER_SUCCESSFUL
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
  /**
   * Save Parking space
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle
   * @memberof UserController
   */
  static async saveParkingSpace(req, res, next) {
    try {
      const { Number, floor, availability , occupancy } = req.body;
      const data = {
        no_of_space: Number, 
        floor, 
        availability, 
        occupancy
      }
      await UserService.saveParkingSpace(data);
      return successResponse(res, {
        code: 200,
        message: SAVE_PARKING_SPACE_SUCCESSFUL
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
   /**
   * Assign parking space to user
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle
   * @memberof UserController
   */
  static async assignSpaceToUser(req, res, next) {
    try {
      const { userId, id } = req.query;
      await UserService.assignSpaceToUser(userId, id);
      return successResponse(res, {
        code: 200,
        message: ASSIGN_SPACE_SUCCESSFUL
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
  /**
   * Unassign parking space from user
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle
   * @memberof UserController
   */
  static async unassignSpace(req, res, next) {
    try {
      const { userId } = req.query;
      await UserService.unassignSpace(userId);
      return successResponse(res, {
        code: 200,
        message: UNASSIGN_SPACE_SUCCESSFUL
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
  /**
   * Get parking space by user
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle
   * @memberof UserController
   */
  static async getSpaceByUser(req, res, next) {
    try {
      const { user_id } = req.params;
      const result = await UserService.getSpaceByUser(user_id);
      return successResponse(res, {
        code: 200,
        message: GET_SPACE_SUCCESSFUL,
        data: result
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
   /**
   * Get all available spaces in the database
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle
   * @memberof UserController
   */
  static async getAvailableSpaces(req, res, next) {
    try {
      const result = await UserService.getAvailableSpace();
      return successResponse(res, {
        code: 200,
        message: GET_FREE_SPACE_SUCCESSFUL,
        data: result
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
}

export default UserController;
