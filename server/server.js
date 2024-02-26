//imported modules
const express = require("express");
const cors = require('cors')
const app = express();

//environment variables
const PORT = process.env.PORT || 3001;

//app config
app.use(cors());
app.use(express.json());

//code from local files
const apiRouter = require('./api/api.routes.js')

// Handle requests to /api route
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

