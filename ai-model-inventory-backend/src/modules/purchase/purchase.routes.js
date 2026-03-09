const express = require('express');
const controller = require('./purchase.controller');

const router = express.Router();

router.post('/purchase-models', controller.createPurchase);
router.get('/purchase-models', controller.getPurchasedModels);

module.exports = router;