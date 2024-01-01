class envelopeBudget {
    
    constructor() {
        this.envelopes = [];
        this.totalBudget = 0;
        this.nextEnvelopeId = 1;
    };

    addEnvelope(instance) {
        if (!this.isUsedName(instance.name)) {
            const newEnvelope = new envelope(instance, this.nextEnvelopeId);
            this.nextEnvelopeId++;
            this.totalBudget += newEnvelope.amount;
            this.envelopes.push(newEnvelope);
            return newEnvelope;
        };
    };

    updateEnvelope(instance) {
        if (envelope.isValid(instance)) {
            const envelopeIndex = this.envelopes.findIndex(envelope => envelope.id === instance.id);
            this.totalBudget -= this.envelopes[envelopeIndex].amount;
            this.totalBudget += instance.amount;
            this.envelopes[envelopeIndex] = instance;
            return instance;
        } else {
            throw new Error("Envelope parameters to update are not valid.")
        };
    };

    deleteEnvelopeById(id) {
        const envelopeIndex = this.envelopes.findIndex(envelope => envelope.id === id);
        if (envelopeIndex !== -1) {
            this.envelopes.splice(envelopeIndex, 1);
            return true;
        } else {
            return false;
        };
    };

    getEnvelopeById(id) {
        const envelope = this.envelopes.find(envelope => envelope.id === id);
        return envelope;
    };

    isUsedName(name) {
        if (this.envelopes.some(envelope => envelope.name.toLowerCase() === name.toLowerCase())) {
            throw new Error("Envelope name already in use.");
        } else {
            return false;
        };
    }
};

class envelope {
    constructor(instance, id) {
        if (envelope.isValid(instance)) {
            this.name = instance.name;
            this.amount = instance.amount;
            this.id = id;
        };
    };

    static isValid(instance) {
        instance.name = instance.name;
        if (!instance.name || !instance.amount) {
            throw new Error("Envelope must have a name and an amount.");
        }
        if (typeof instance.name !== 'string') {
            throw new Error("Envelope name must be a string.");
        };
        if (!isNaN(parseFloat(instance.amount)) && isFinite(instance.amount) && instance.amount >= 0) {
            instance.amount = Number(instance.amount);
        } else {
            throw new Error("Envelope money amount must be a number greater or equal to 0.");
        };
        return true;
    };
};

const personalBudget = new envelopeBudget();

// For testing purpose
personalBudget.addEnvelope({
    name: "Entretenimiento",
    amount: 100
});
personalBudget.addEnvelope({
    name: "Ahorro",
    amount: 200
});

module.exports = personalBudget;