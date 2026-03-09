const express = require('express');
const modelRoutes = require('../modules/model/model.routes');
const userRoutes = require('../modules/user/user.routes');
const purchaseRoutes = require('../modules/purchase/purchase.routes');

const router = express.Router();

router.use('/', modelRoutes);
router.use('/', userRoutes);
router.use('/', purchaseRoutes);

module.exports = router;