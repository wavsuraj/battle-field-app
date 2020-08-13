const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const router = require("./routes/battles"); //new addition
const InitiateMongoServer = require("./config/db");


let allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.disable('x-powered-by');

// app.get("/", (req, res) => {
//     res.json({ message: "API Working" });
// });
express.Router().use(function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(express.static('./build'));
/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/', router);

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});