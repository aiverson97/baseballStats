//index.js
// Link to Documentation:
// https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d

// Import express to run web server
let express = require('express');
// Import Body Parser for parsing incoming request data
let bodyParser = require('body-parser');
// Import Mongoose for modeling Mongodb
let mongoose = require('mongoose');
// Initialize the app
let app = express();
app.set('json spaces', 2);

// Import api-routes.js file to use defined routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/baseballStats', { useNewUrlParser: true});
var db = mongoose.connection;

// Check if DB connection was successful
if(!db) {
    console.log("Error connecting db");
} else {
    console.log("Db connected successfully");
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use API routes in the app
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running baseballStats on port " + port);
});
