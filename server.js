// Require in the necessary dependencies
var express = require("express");
var path = require('path');
var exphbs = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Our scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines", {
  useNewUrlParser: true
});

// Requiring our routes
var routes = require('./routes/index');
var articles = require('./routes/articles');

app.use('/', routes);
app.use('/articles', articles);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});