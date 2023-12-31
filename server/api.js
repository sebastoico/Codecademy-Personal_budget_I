const express = require('express');
const apiRouter = express.Router();

const personalBudget = require("./envelopes.js");

// Get a list of the different envelopes
apiRouter.get("/", (req, res) => {
    res.send(personalBudget.envelopes);
});

// Create a new envelop
apiRouter.post("/", (req, res) => {
    try {
        res.status(201).send(personalBudget.addEnvelope(req.body));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Parameter handler
apiRouter.use("/:envelopId", (req, res, next) => {
    req.id = Number(req.params.envelopId);
    req.envelop = personalBudget.getEnvelopeById(req.id);
    if (req.envelop) {
        next();
    } else {
        res.status(404).send("Envelop not found.");
    };
});

// Get envelop by Id
apiRouter.get("/:envelopId", (req, res) => {
    res.send(req.envelop);
});

module.exports = apiRouter;