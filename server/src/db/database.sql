CREATE TABLE users (
  user_id serial PRIMARY KEY,
  first_name VARCHAR ( 50 ) UNIQUE NOT NULL,
  last_name VARCHAR ( 50 ) UNIQUE NOT NULL,
  email VARCHAR ( 255 ) UNIQUE NOT NULL,
  password VARCHAR ( 50 ) NOT NULL,
  last_login TIMESTAMP
  created_on TIMESTAMP NOT NULL,
)
