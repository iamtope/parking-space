import queries from '../../db/queries/users';
import Db from '../../db';

const {
  findUser,
  disableUser,
  saveParkingSpace,
  assignParkingSpaceToUser,
  unassignParkingSpace,
  getSpaceByUser,
  getAvailableSpace
} = queries;
/**
 *  Contains several methods to manage user resorces
 *  @class UserServices
 */
class UserService {
  /**
   * Fetches a User by his/her email.
   * @memberof UserService
   * @param { String } email - The email address of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  static async fetchUser(email) {
    return Db.oneOrNone(findUser, [email]);
  }

  /**
   * Disables  a User by his/her email.
   * @memberof UserService
   * @param { String } email - The email address of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  static async disableUser(email) {
    return Db.oneOrNone(disableUser, [email]);
  }

  /**
   * Disables  a User by his/her email.
   * @memberof UserService
   * @param { String } email - The email address of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  static async saveParkingSpace(data) {
    return Db.manyOrNone(saveParkingSpace, [
      data.no_of_space,
      data.floor,
      data.availability,
      data.occupancy,
    ]);
  }

  static async assignSpaceToUser(userId, id) {
    return Db.none(assignParkingSpaceToUser, ['in_use', userId, id]);
  }
  
  static async unassignSpace(userId) {
    return Db.none(unassignParkingSpace, [ 'available', null, userId]);
  }

  static async getSpaceByUser(userId) {
    return Db.manyOrNone(getSpaceByUser, [userId]);
  }

  static async getAvailableSpace() {
    return Db.manyOrNone(getAvailableSpace, []);
  }
}

export default UserService;
