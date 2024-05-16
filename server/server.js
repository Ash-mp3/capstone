//imported modules
require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const winston = require("winston");
const { combine, timestamp, json } = winston.format;

//code from local files

//routers
const apiRouter = require("./api/api.routes.js");

//loggers
const logger = require("./config/logger.js");

//environment variables
const PORT = process.env.SERVER_PORT;

//app config
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle requests to /api route
app.use("/api", apiRouter);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

app.listen(3001, () => {
	logger.info(`Server listening on ${PORT}`);
});
