DROP TABLE IF EXISTS chats CASCADE;

CREATE TABLE chats (
      id SERIAL PRIMARY KEY,
      sender_id INT NOT NULL REFERENCES users(id),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

     INSERT INTO chats (sender_id, message) VALUES 
     ('201','Hi peeps, what is up?!'),
     ('2','Whats good'),
     ('3','Helloooo'),
     ('4','Let me tell you a story'),
     ('5','Hey everyone'),
     ('6','Hi People'),
     ('7','whats up friends'),
     ('8','Hey you aall '),
     ('9','Hello my friends'),
     ('10','Lets get social!!!'),
     ('11','Hey how are you??')
    