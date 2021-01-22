import db from '../db';
import queries from '../db/queries/users';
import { DBError, constants } from '../utils';

const { INTERNAL_SERVER_ERROR } = constants;
const { createAdmin } = queries;
/**
 * Contains a schema that creates user and retrieve their information
 *  @class UserModel
 *
 */
class AdminModel {
  /**
   * This is a constructor for creating a User.
   * @param { Object } userInfo - contains the required properties for creating
   * User instance.
   * @returns { AdminModel } - An instance of the User Model.
   * @constructor UserModel
   *
   */
  constructor(userInfo) {
    this.first_name = userInfo.firstName;
    this.last_name = userInfo.lastName;
    this.email = userInfo.email;
    this.password = userInfo.password;
    this.salt = userInfo.salt;
    this.role = 'admin';
  }

  /**
   * Persists new Admin to the database
   * @memberof AdminModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a user object or database error
   */
  async saveUser() {
    try {
      return db.oneOrNone(createAdmin, [
        this.first_name,
        this.last_name,
        this.email,
        this.password,
        this.salt,
        this.role
      ]);
    } catch (e) {
      const error = new DBError({
        status: INTERNAL_SERVER_ERROR,
        message: e.message,
      });

      throw error;
    }
  }

  /**
   * Persists new Merchant to the database
   * @memberof MerchantModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Merchant object or database error
   */
  async save() {
    logger.debug('Adding admin data to database');
    return db.tx(async (t) => {
      const userInfo = await this.saveUser(t);
      logger.debug('Admin added successfully');
      return {
        userId: userInfo.id,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        email: userInfo.email,
        role: userInfo.role,
        createdAt: userInfo.created_at
      };
    });
  }
}

export default AdminModel;
