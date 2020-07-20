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

//////// INSERT REGISTRATION DATA INTO users TABLE \\\\\\\\\\\\\
exports.insertRegData = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [first, last, email, password]
    );
};

// GET HASHED PASSWORD FROM users TABLE
exports.getPassword = (email) => {
    return db.query(
        `SELECT password, id FROM users
        WHERE email = $1`,
        [email]
    );
};

// GET EMAIL FROM users TABLE TO VERIFY EMAIL FOR COMPONENT 1
exports.getEmail = (email) => {
    return db.query(
        `SELECT * FROM users
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

// UPDATE PASSWORD IN users TABLE
exports.updatePw = (password, email) => {
    console.log("I am updating the pw");

    return db.query(
        `UPDATE users SET password=$1 WHERE email = $2 RETURNING * `,
        [password, email]
    );
};

// SELECT EVERYTHING FROM users TABLE TO DISPLAY IN APP COMPONENT
exports.getUserInfo = (id) => {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [id])
        .then(({ rows }) => rows);
};

// ADD IMAGE URL TO THE DATABASE
exports.addImage = (url, id) => {
    return db.query(`UPDATE users SET url=$1 WHERE id=$2 RETURNING *`, [
        url,
        id,
    ]);
};

// ADD BIO TO THE users TABLE
exports.updateBio = (bio, id) => {
    // console.log("id, bio: ", id, bio);
    return db.query(`UPDATE users SET bio=$2 WHERE id=$1 RETURNING *`, [
        bio,
        id,
    ]);
};

// FETCH OTHER USERS PROFILE
exports.getOtherProfile = (id) => {
    // console.log("id: ", id);
    return db.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

// GET 3 USERS WHO RECENTLY SIGNED UP
exports.getRecentUsers = () => {
    /* console.log("id: ", id); */
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

// GET USERS WHO MATCH THE SEARCH
exports.getUserMatches = (val) => {
    /* console.log("val: ", val); */
    return db.query(
        `SELECT * FROM users WHERE first ILIKE $1 OR last ILIKE $1;`,
        [val + "%"]
    );
};

// SELECT TO DETERMINE WHAT THE BUTTON SHOULD SAY
exports.getCurrentFriendshipStatus = (myId, otherId) => {
    return db.query(
        `SELECT * FROM friendships
           WHERE (receiver_id = $1 AND sender_id = $2)
           OR (receiver_id = $2 AND sender_id = $1);
           `,
        [myId, otherId]
    );
};
// INSERT that runs when "send friend request" is clicked. It will INSERT the two users' ids (sender_id and receiver_id)
exports.makeFriendRequest = (myId, otherId) => {
    return db.query(
        `INSERT INTO friendships(sender_id, receiver_id) VALUES ($2, $1) RETURNING *`,
        [myId, otherId]
    );
};

// UPDATE that runs when "accept friend request" is clicked. It's going to update the accepted column from false to true
exports.acceptFriendship = (myId, otherId) => {
    return db.query(
        `UPDATE friendships SET accepted=true WHERE sender_id=$1 AND receiver_id=$2 RETURNING *`,
        [myId, otherId]
    );
};

// DELETE that runs when "cancel friend request" or "end friendship" is clicked. It will DELETE the two users' row from friendships
exports.deleteFriendship = (myId, otherId) => {
    return db.query(
        `DELETE FROM friendships WHERE receiver_id = $1 AND sender_id = $2
        OR receiver_id = $2 AND sender_id = $1 RETURNING *`,
        [myId, otherId]
    );
};

// SELECT USERS WHO ARE WANNABE FRIENDS
// this will return users that you're friends with and users who have sent YOU a friend request.
// Users that you've sent a friend request to will NOT show up in this query.
exports.getWannabes = (id) => {
    /* console.log("trying to get friends"); */
    return db.query(
        `SELECT users.id, first, last, url, accepted
            FROM friendships
            JOIN users
            ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
    `,
        [id]
    );
};

// your db query for getting the last 10  messages will need to be a JOIN
exports.getTenLastMsgs = () => {
    console.log("trying to get 10 last messages");
    return db.query(
        `SELECT users.id, chats.id AS message_id, first, last, url, message, chats.created_at FROM chats JOIN users on (sender_id = users.id) LIMIT 10`
    );
};

// you'll need info from both the users table and chats table (user's first name, last name, url and chat msg)
/* exports.getLastTenMsgs; */
