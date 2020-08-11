const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/battles"); //new addition
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.disable('x-powered-by');

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/', router);

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});