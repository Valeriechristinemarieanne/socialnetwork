// This module handles my queries:

const spicedPg = require("spiced-pg");
/* const bcrypt = require("./bcrypt"); */

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("./secrets");
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);
}

//////// INSERT REGISTRATION DATA INTO REGISTER TABLE \\\\\\\\\\\\\
exports.insertRegData = (first, last, email, password) => {
    return db.query(
        `INSERT INTO register (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [first, last, email, password]
    );
};

// GET HASHED PASSWORD FROM REGISTER TABLE
exports.getPassword = (email) => {
    return db.query(
        `SELECT password, id FROM register
        WHERE email = $1`,
        [email]
    );
};

// GET EMAIL FROM REGISTER TABLE TO VERIFY EMAIL FOR COMPONENT 1
exports.getEmail = (email) => {
    return db.query(
        `SELECT * FROM register
        WHERE email = $1`,
        [email]
    );
};

// INSERT CODE AND EMAIL INTO reset_codes TABLE
exports.insertCode = (secretCode, email) => {
    console.log("secretCode, email: ", secretCode, email);

    return db.query(
        `INSERT INTO reset_codes (code, email) VALUES ($1, $2) RETURNING *`,
        [secretCode, email]
    );
};
