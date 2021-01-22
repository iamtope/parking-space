export default {
  createUser: `
  INSERT INTO
     user_info(first_name, last_name, email, password, salt, role, drivers_license) 
  VALUES
     (
        $1, $2, $3, $4, $5, $6, $7
     )
     RETURNING id, role, first_name, last_name, email, created_at, updated_at`,
   assignParkingSpaceToUser: `UPDATE 
   parking_space 
   SET availability=$1, user_id = $2
   WHERE id = $3`,
   unassignParkingSpace: `UPDATE parking_space SET availability=$1, user_id=$2 WHERE user_id=$3`,
  createAdmin: `
  INSERT INTO
     user_info(first_name, last_name, email, password, salt, role) 
  VALUES
     (
        $1, $2, $3, $4, $5, $6
     )
     RETURNING id, role, first_name, last_name, email, created_at, updated_at`,
  findUser: `SELECT * FROM user_info WHERE email=$1`,
  disableUser: `UPDATE user_info SET is_Active=false WHERE email = $1`,
  saveParkingSpace: `INSERT INTO 
  parking_space(no_of_space, floor, availability, occupancy)
  VALUES
  (
   $1, $2, $3, $4
  ) RETURNING *`,
  getSpaceByUser: `SELECT * FROM parking_space where user_id=$1`,
  getAvailableSpace: `select no_of_space, floor, availability, occupancy, created_at from parking_space where availability = 'available'`
};
