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
    return db.query(
        `INSERT INTO reset_codes (code, email) VALUES ($1, $2) RETURNING *`,
        [secretCode, email]
    );
};

// SELECT CODE AND EMAIL TO SEE IF IT MATCHES
exports.verifyCode = (secretCode) => {
    return db.query(
        `SELECT * FROM reset_codes
  WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND code =$1`,
        [secretCode]
    );
};

// UPDATE PASSWORD IN REGISTER TABLE
exports.updatePw = (password, email) => {
    console.log("I am updating the pw");

    return db.query(
        `UPDATE register SET password=$1 WHERE email = $2 RETURNING * `,
        [password, email]
    );
};

// SELECT EVERYTHING FROM REGISTER TABLE TO DISPLAY IN APP COMPONENT
exports.getUserInfo = (id) => {
    return db
        .query(`SELECT * FROM register WHERE id=$1`, [id])
        .then(({ rows }) => rows);
};

// ADD IMAGE URL TO THE DATABASE
exports.addImage = (url, id) => {
    return db.query(`UPDATE register SET url=$1 WHERE id=$2 RETURNING *`, [
        url,
        id,
    ]);
};
