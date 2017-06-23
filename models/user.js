const db = require('../db/config.js');

const User = {};

User.findByUserName = (username) => {
  return db.oneOrNone(
    `
    SELECT * FROM users 
    WHERE username = $1`,
    [username]
  );
}

User.create = (userInfo) => {
  return db.oneOrNone(
    `
    INSERT INTO users (username, password, admin)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [userInfo.username, userInfo.password, userInfo.admin]
  );
}

module.exports = User;
