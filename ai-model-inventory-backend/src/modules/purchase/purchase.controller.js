const purchaseService = require('./purchase.services');

const createPurchase = async (req, res) => {
    const model = req.body;
    const result = await purchaseService.createPurchase(model);
    res.send(result);
};

const getPurchasedModels = async (req, res) => {
    const { email } = req.query;
    const result = await purchaseService.getPurchasedModelsByEmail(email);
    res.send(result);
};

module.exports = {
    createPurchase,
    getPurchasedModels,
};