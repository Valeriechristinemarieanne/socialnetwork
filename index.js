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

// Socket Boilerplate
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

// Cookiesession & passing cookie access to socket
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// Express
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
        res.redirect("/");
    } else {
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
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    getPassword(userEmail)
        .then((result) => {
            const hashedUserPasswordFromDB = result.rows[0].password;
            compare(userPassword, hashedUserPasswordFromDB)
                .then((match) => {
                    if (match) {
                        req.session.id = result.rows[0].id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("error in POST / login compare: ", err);
                    res.sendStatus(500);
                });
        })
        .catch((err) => {
            console.log("error in POST/login: ", err);
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
});

app.get("/api/user/:id", (req, res) => {
    getOtherProfile(req.params.id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in GET/user/id SERVER ROUTE: ", err);
        });
});

app.get("/api/users/:id", (req, res) => {
    getRecentUsers()
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("error in GET/users SERVER ROUTE: ", err);
        });
});

app.get("/api/usermatches", (req, res) => {
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
            res.json({ accepted: true });
        })
        .catch((err) => {
            console.log(
                "error in POST/accept friend request SERVER ROUTE: ",
                err
            );
        });
});

app.get("/friends-wannabes/", (req, res) => {
    const { id } = req.session;
    getWannabes(id)
        .then((result) => {
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
    updateBio(id, bio)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("error in POST/updateBio cannot update bio: ", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const imageUrl = `${s3Url}${filename}`;
    const id = req.session.id;

    if (req.file) {
        addImage(imageUrl, id)
            .then((response) => {
                res.json(response.rows[0].url);
            })
            .catch((err) => {
                console.log("error in POST upload (addImage): ", err);
            });
    } else {
        console.log("ERROR in POST images");
    }
});

app.post("/resetpassword", (req, res) => {
    let userEmail = req.body.email;
    getEmail(userEmail)
        .then((result) => {
            const registeredEmail = result.rows[0].email;
            if (userEmail == registeredEmail) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });

                insertCode(secretCode, userEmail)
                    .then((result) => {
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
                res.sendStatus(500);
            }
        })
        .catch((err) => {
            console.log("error in POST/resetPW cannot getEmail: ", err);
            res.sendStatus(500);
        });
});

app.post("/verifypassword", (req, res) => {
    let userCode = req.body.code;
    verifyCode(userCode).then((result) => {
        const codeInDB = result.rows[0].code;
        if (userCode == codeInDB) {
            hash(req.body.password)
                .then((hashedPw) => {
                    updatePw(hashedPw, req.body.email).then((result) => {
                        res.json(result);
                    });
                })
                .catch((err) => {
                    console.log("error in POST/verifyCode/hash: ", err);
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
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", (socket) => {
    console.log(`socket with id ${socket.id} just CONNECTED`);

    // we only want to do socket when a user is logged in
    if (!socket.request.session.id) {
        console.log(`socket with id ${socket.id} just DISCONNECTED`);
        return socket.disconnect(true);
    }

    // if user makes it at this point, then they're logged in and have successfully connected to sockets
    const id = socket.request.session.id;

    /*   // this is a good place to go get the last 10 chat messages
    getLastTenMsgs().then((data) => {
        console.log(data.rows);

        // once you have the messages, you'll want to send them back to the client!
        io.sockets.emit("chatMessages", data.rows);
    }); */

    socket.on("My amazing chat message", (newMsg) => {
        console.log("This message is coming from chat.js component: ", newMsg);
        console.log("user who sent newMsg is: ", id);
        console.log("our current socket.id: ", socket.id);

        // 1. do a db query to store the new chat message into the chat table!!!
        // 2. do a db query to get info about hte user (first, name, last name, and img) - will probably need to be a join
        // once you have all that good data, we want to EMIT our message object to EVERYONE so everyone can see it immediately!!!!

        // we're emitting the message back to the client
        io.sockets.emit("addChatMsg", newMsg);
    });

    /* socket.on("disconnect", () => {
        console.log(`socket with id ${socket.id} just DISCONNECTED`);
    }); */
});
