const express = require("express");
const statesRouter = require("./routers/states");
require("./mongoose/db/mongoose");

//setting up the express server
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(200).json({});
    }
    next();
});

//setting up the middlewares
app.use(express.json());
app.use(statesRouter);

//exporting the app
module.exports = app;