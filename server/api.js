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
const checkId = (req, res, next) => {
    req.id = Number(req.params.envelopId);
    req.envelop = personalBudget.getEnvelopeById(req.id);
    if (req.envelop) {
        if (req.body.id && req.id === req.body.id) {
            next();
        } else {
            res.status(400).send("Envelop endpoint Id and body Id are not the same.");
        };
    } else {
        res.status(404).send("Envelop not found.");
    };
};

// Get envelop by Id
apiRouter.get("/:envelopId", (req, res) => {
    req.id = Number(req.params.envelopId);
    req.envelop = personalBudget.getEnvelopeById(req.id);
    res.send(req.envelop);
});

// Update envelop by Id
apiRouter.put("/:envelopId", checkId, (req, res) => {
    try {
        const updatedEnvelope = personalBudget.updateEnvelope(req.body);
        res.send(updatedEnvelope);
    } catch (err) {
        res.status(400).send(err.message);
    };
});

// Delete envelop by Id
apiRouter.delete("/:envelopId", checkId, (req, res) => {
    personalBudget.deleteEnvelopeById(req.id);
    res.status(204).send();
});

// Transfer budget
apiRouter.post("/transfer/:envelopFrom,:envelopTo", (req, res) => {
    const amountToTransfer = req.body.amount;

    req.idFrom = Number(req.params.envelopFrom);
    req.idTo = Number(req.params.envelopTo);
    const envelopFrom = personalBudget.getEnvelopeById(req.idFrom);
    const envelopTo = personalBudget.getEnvelopeById(req.idTo);

    if (amountToTransfer) {
        if (envelopFrom && envelopTo) {
            if (amountToTransfer <= envelopFrom.amount) {
                envelopFrom.amount -= amountToTransfer;
                envelopTo.amount += amountToTransfer;
                res.send({
                    "New Envelop From": envelopFrom,
                    "New Envelop To": envelopTo
                });
            } else {
                res.status(404).send("Not enough amount to transfer.");
            };
        } else {
            if (!envelopFrom && !envelopTo) {
                res.status(404).send("IDs are not well defined.");
            } else if (!envelopFrom) {
                res.status(404).send("Initial envelop ID is not well defined.");
            } else if (!envelopTo) {
                res.status(404).send("End ID is not well defined.");
            };
        };
    } else {
        res.status(404).send("Amount to transfer not defined.");
    }
});

module.exports = apiRouter;