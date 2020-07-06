  DROP TABLE IF EXISTS register CASCADE;
 
 CREATE TABLE register(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255),
      last VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255)
      );