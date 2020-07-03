const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());
app.use(express.static("./public"));

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
/* 
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        //if the user is logged in ...
        res.redirect("/");
    } else {
        // the user is not logged in
        res.sendFile(__dirname + "/index.html");
    }
}); */

/* app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }

    res.sendFile(__dirname + "/index.html");
});
 */
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
