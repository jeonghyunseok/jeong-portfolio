//server/server.js
var express = require("express");
var router = require("./Routes/Routes");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser")
// favicon
app.use('/favicon.ico', express.static('../favicon.ico'));

// VIEW ENGINE CONFIGURE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../src"));
app.use(express.static(path.join(__dirname, "../../src")));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

//세션 기능용
app.use(cookieParser());

// var db = mongoose.connection;
// db.on("error", console.error);

// db.once("open", function() {
// // CONNECTED TO MONGODB SERVER
//   console.log("Connected to mongod server");
// });
 
// mongoose.connect("mongodb://globepoint:globep0int@13.209.73.222:25015/admin", { dbName: 'vrware_storymaker' });
// mongoose.connect("mongodb://member:globep0int@13.125.140.13:25015/admin", { dbName: 'vrware_member' });

console.log(mongoose.connection.readyState);

// [CONFIGURE ROUTER]

app.use("/", router);

module.exports = app;
