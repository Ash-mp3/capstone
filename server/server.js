//imported modules
const path = require("path");
const express = require("express");
const cors = require('cors')
const app = express();

//app config
app.use(cors());
app.use(express.json());

//code from local files
const apiRouter = require('./api/api.routes.js')

//environment variables
const PORT = process.env.PORT || 3001;



// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle requests to /api route
app.use('/api', apiRouter)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

