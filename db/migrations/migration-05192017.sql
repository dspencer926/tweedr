
DROP TABLE tweeds;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(1024),
  password VARCHAR(1024),
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS tweeds (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  tweed_text VARCHAR(1024),
  tweed_time BIGINT,
  edited BOOLEAN,
  edited_time BIGINT
);
