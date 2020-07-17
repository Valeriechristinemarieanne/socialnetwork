DROP TABLE IF EXISTS chats CASCADE;

CREATE TABLE chats (
      id SERIAL PRIMARY KEY,
      sender_id INT NOT NULL REFERENCES users(id),
      message TEXT 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO chats (sender_id, message) VALUES (
    'funkychicken',
    'Welcome to Spiced and the Future!',
    'This photo brings back so many great memories.'
);
INSERT INTO chats (sender_id, message) VALUES (
    'discoduck',
    'Elvis',
    'We can''t go on together with suspicious minds.'
);
INSERT INTO chats (sender_id, message) VALUES (

    'discoduck',
    'To be or not to be',
    'That is the question.'
);