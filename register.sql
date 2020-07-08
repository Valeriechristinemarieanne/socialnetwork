DROP TABLE IF EXISTS register CASCADE;
 
 CREATE TABLE register(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL CHECK (first !=''),
      last VARCHAR(255) NOT NULL CHECK (last !=''),
      email VARCHAR(255) NOT NULL UNIQUE CHECK (email !=''),
      password VARCHAR(255) NOT NULL UNIQUE CHECK (password !=''),
      url VARCHAR
      );