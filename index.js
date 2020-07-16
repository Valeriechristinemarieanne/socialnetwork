const express = require("express");
const app = express();
const compression = require("compression");
const { hash, compare } = require("./bc.js");
const {
    insertRegData,
    getPassword,
    getEmail,
    insertCode,
    verifyCode,
    updatePw,
    getUserInfo,
    addImage,
    updateBio,
    getOtherProfile,
    getRecentUsers,
    getUserMatches,
    getCurrentFriendshipStatus,
    makeFriendRequest,
    deleteFriendship,
    acceptFriendship,
    getWannabes,
} = require("./db.js");
const { sendEmail } = require("./ses.js");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const csurf = require("csurf");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
console.log("s3Url: ", s3Url);
app.use(compression());
app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: `Ì am always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        //to set the cookies-how long we want cookie to last
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: false,
    })
);

// FILE UPLOAD BOILERPLATE
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// this middleware works for all post requests
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////// ROUTES \\\\\\\\\\\\\

app.get("/welcome", (req, res) => {
    if (req.session.id) {
        //if the user is logged in ...
        /* console.log("user is already logged in (welcome route)"); */
        res.redirect("/");
    } else {
        // the user is not logged in
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", function (req, res) {
    hash(req.body.password)
        .then((hashedPw) => {
            insertRegData(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPw
            )
                .then((result) => {
                    /* console.log("req.body: ", req.body);
                    console.log("req.session: ", req.session); */
                    if (result.rows[0]) {
                        req.session.id = result.rows[0].id;
                        res.json();
                    } else {
                        res.sendStatus(500);
                        console.log("error in if/else statement: ", err);
                    }
                })
                .catch((err) => {
                    console.log("error in POST/sending Data: ", err);
                    res.sendStatus(500);
                });
        })
        .catch((err) => {
            console.log("error in POST/register: ", err);
            res.sendStatus(500);
        });
});

app.post("/login", (req, res) => {
    // with the help of the e-mail adress we will identify, the hash to check against the password provided
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    console.log("req.body.password: ", req.body.password);

    getPassword(userEmail)
        .then((result) => {
            console.log("result.rows[0].password: ", result.rows[0].password);
            const hashedUserPasswordFromDB = result.rows[0].password;
            compare(userPassword, hashedUserPasswordFromDB)
                .then((match) => {
                    if (match) {
                        // if match is true, you want to store the user id in the cookie
                        req.session.id = result.rows[0].id;
                        res.json({ success: true });
                        // if compare returned true: check if the user has signed the petition
                    } else {
                        // if password don't match render login with error message
                        console.log("I don't think there is a match");
                        // res.sendStatus(500);
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("error in POST / login compare: ", err);
                    // you probably just want to render login with an error
                    res.sendStatus(500);
                });
        })
        .catch((err) => {
            console.log("error in POST/login: ", err);
            res.render("login", { error: true });
        });
});

app.get("/user", (req, res) => {
    getUserInfo(req.session.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log("error in GET/user SERVER ROUTE: ", err);
            res.sendStatus(500);
        });
    // make request to database to fetch user information
    // send data to app.js
});

app.get("/api/user/:id", (req, res) => {
    getOtherProfile(req.params.id)
        .then((result) => {
            // console.log("result for user/id: ", result.rows[0]);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in GET/user/id SERVER ROUTE: ", err);
        });
});

app.get("/api/users/:id", (req, res) => {
    getRecentUsers()
        .then((result) => {
            /* console.log("result.rows", result.rows); */
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in GET/users SERVER ROUTE: ", err);
            /* res.sendStatus(500); */
        });
});

app.get("/api/usermatches", (req, res) => {
    /* console.log("query is ", req.query.userName); */
    getUserMatches(req.query.userName)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in GET/usermatches SERVER ROUTE: ", err);
        });
});

app.get("/get-initial-status/:id", (req, res) => {
    getCurrentFriendshipStatus(req.params.id, req.session.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in GET/initial status SERVER ROUTE: ", err);
        });
});

app.post("/make-friend-request/:id", (req, res) => {
    makeFriendRequest(req.params.id, req.session.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(
                "error in POST/make friend request SERVER ROUTE: ",
                err
            );
        });
});

app.post("/endfriendship/:id", (req, res) => {
    deleteFriendship(req.params.id, req.session.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log("error in POST/end friendship SERVER ROUTE: ", err);
        });
});

app.post("/accept-friend-request/:id", (req, res) => {
    acceptFriendship(req.params.id, req.session.id)
        .then((result) => {
            res.json({ accept: true });
        })
        .catch((err) => {
            console.log(
                "error in POST/accept friend request SERVER ROUTE: ",
                err
            );
        });
});

app.get("/friends-wannabes/", (req, res) => {
    console.log("I am in the friends-wannabes server route");
    const { userId } = req.session;
    getWannabes(userId)
        .then((result) => {
            console.log("result: ", result);
            res.json(result);
        })
        .catch((err) => {
            console.log(
                "error in GET/ friends and wannabes SERVER ROUTE: ",
                err
            );
        });
});

app.post("/updatebio", (req, res) => {
    let bio = req.body.bio;
    let id = req.session.id;
    console.log("req.body.bio: ", req.body.bio);

    updateBio(id, bio)
        .then((result) => {
            // console.log("result.rows[0].bio: ", result.rows[0].bio);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("error in POST/updateBio cannot update bio: ", err);
            // you probably just want to render login with an error
            // res.sendStatus(500);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const imageUrl = `${s3Url}${filename}`;
    const id = req.session.id;

    if (req.file) {
        addImage(imageUrl, id)
            .then((response) => {
                // console.log("response: ", response);
                res.json(response.rows[0].url);
                // console.log("response.rows[0]: ", response.rows[0]);
                // console.log("response.rows[0].url: ", response.rows[0].url);
            })
            .catch((err) => {
                console.log("error in POST upload (addImage): ", err);
                // res.sendStatus(500);
            });
    } else {
        console.log("ERROR in POST images");
    }
});

app.post("/resetpassword", (req, res) => {
    let userEmail = req.body.email;
    console.log("req.body.email: ", req.body.email);

    getEmail(userEmail)
        .then((result) => {
            console.log("result.rows: ", result.rows);

            const registeredEmail = result.rows[0].email;
            // console.log("result.rows[0].email", result.rows[0].email);
            // console.log("registeredEmail:", registeredEmail);

            if (userEmail == registeredEmail) {
                // console.log("I guess emails are the same?");
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                // console.log("secretcode: ", secretCode);
                insertCode(secretCode, userEmail)
                    .then((result) => {
                        // console.log("result.rows: ", result.rows);
                        // console.log("my secret code: ", secretCode);
                        sendEmail(
                            userEmail,
                            "Here is your password reset code",
                            secretCode
                        ).then(() => {
                            res.json({ success: true, email: req.body.email });
                        });
                    })
                    .catch((err) => {
                        console.log("error in insertCode", err);
                    });
            } else {
                // if emails don't match
                res.sendStatus(500);
                console.log("Email and email are not the same");
            }
        })
        .catch((err) => {
            console.log("error in POST/resetPW cannot getEmail: ", err);
            // you probably just want to render login with an error
            res.sendStatus(500);
        });
});

app.post("/verifypassword", (req, res) => {
    // console.log("I am entering verify password");

    let userCode = req.body.code;
    // console.log("req.body: ", req.body);

    verifyCode(userCode).then((result) => {
        // console.log("result.rows in verify code: ", result.rows);
        console.log("req.body.password: ", req.body.password);

        const codeInDB = result.rows[0].code;
        if (userCode == codeInDB) {
            hash(req.body.password)
                .then((hashedPw) => {
                    console.log("hashedPw: ", hashedPw);

                    updatePw(hashedPw, req.body.email).then((result) => {
                        console.log("result.rows: ", result.rows);
                        res.json(result);
                    });
                })
                .catch((err) => {
                    console.log("error in POST/verifyCode/hash: ", err);
                    // you probably just want to render login with an error
                    res.sendStatus(500);
                });
        }
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", function (req, res) {
    if (!req.session.id) {
        /* console.log("I know i am not logged in"); */
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
