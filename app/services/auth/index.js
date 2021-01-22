import db from '../../db';
import queries from '../../db/queries/auth';
import { Helper, constants } from '../../utils';

/**
 * Contains a collection of service methods for managing users token
 * @class AuthService
 *
 */
class AuthService {
  /**
   * Encode user data in token
   * @param { String } token - user password reset token
   * @param { String } email - user email
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async saveUserResetPasswordToken(token, email) {
    try {
      await db.none(queries.saveResetPasswordToken, [token, email]);
    } catch (error) {
      throw Helper.processDBError(constants.SAVE_RESET_PASSOWRD_TOKEN_FAIL, error.message);
    }
  }

  /**
   * updates a user verification status in the database to true
   * @param { String } id - user id
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async updateUserVerificationStatus(id) {
    return db.oneOrNone(queries.updateUserVerificationStatus, ['True', id]);
  }
}

export default AuthService;
