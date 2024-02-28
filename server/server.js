//imported modules
require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const app = express();

//code from local files
const apiRouter = require("./api/api.routes.js");

//environment variables
const PORT = process.env.SERVER_PORT;

//app config
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle requests to /api route
app.use("/api", apiRouter);

app.listen(3001, () => {
  console.log(`Server listening on ${PORT}`);
});
