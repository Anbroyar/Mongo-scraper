var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require('cheerio');
var request = require('request');

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
app.use( require("./controllers/fetch.js"));
app.use( require("./controllers/headline.js"));

require("./routes/api")(app);
require("./routes/index")(app);
require("./routes/view")(app);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});