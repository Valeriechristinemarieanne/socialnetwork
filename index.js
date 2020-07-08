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
} = require("./db.js");
const { sendEmail } = require("./ses.js");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const csurf = require("csurf");
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

    getPassword(userEmail)
        .then((result) => {
            const hashedUserPasswordFromDB = result.rows[0].password;
            compare(userPassword, hashedUserPasswordFromDB)
                .then((match) => {
                    if (match) {
                        // if match is true, you want to store the user id in the cookie
                        req.session.id = result.rows[0].id;
                        res.json();
                        // if compare returned true: check if the user has signed the petition
                    } else {
                        // if password don't match render login with error message
                        res.sendStatus(500);
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
    // make request to database to fetch user information
    // send data to app.js
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
    console.log("I am entering verify password");

    let userCode = req.body.code;

    verifyCode(userCode).then((result) => {
        console.log("result.rows in verify code: ", result.rows);
        const codeInDB = result.rows[0].code;
        if (userCode == codeInDB) {
            hash(req.body.password).then((hashedPw) => {
                updatePw(hashedPw, req.body.email).then((result) => {
                    // console.log("result.rows: ", result.rows);
                    res.json(result);
                });
            });
        }
    });
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
