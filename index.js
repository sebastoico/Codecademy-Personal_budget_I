const express = require('express');
const app = express();

const PORT = 3000;

// Add middware for parsing request bodies here:
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Mount API router
const apiRouter = require('./server/api.js');
app.use("/envelopes/", apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));