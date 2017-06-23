const db = require('../db/config');

const Tweed = {};

Tweed.findAll = () => {
  return db.query(
    `SELECT tweeds.id, tweeds.tweed_text, tweeds.tweed_time, tweeds.edited, tweeds.edited_time, users.username 
     FROM tweeds INNER JOIN users
     ON tweeds.user_id = users.id`
  );
};

Tweed.findById = (id) => {
  return db.oneOrNone(
    `
    SELECT * FROM tweeds LEFT JOIN users
    ON user_id = id
    WHERE id = $1`, 
    [id]
  );
};

Tweed.create = (tweed) => {
  return db.one(
    `
    INSERT INTO tweeds (user_id ,tweed_text, tweed_time, edited, edited_time)
    VALUES ($1, $2, $3, 'false', NULL)
    RETURNING *`,
    [tweed.userId, tweed.tweed, tweed.time]
  );
};

Tweed.update = (tweed, id) => {
  return db.one(
    `
      UPDATE tweeds SET
      tweed_text = $1,
      edited = TRUE,
      edited_time = $2
      WHERE id = $3
      RETURNING *
    `, [tweed.tweed, tweed.edited_time, id]
  );
};

Tweed.destroy = id => {
  return db.none(
    `
      DELETE FROM tweeds
      WHERE id = $1
    `, [id]
  );
};

module.exports = Tweed;