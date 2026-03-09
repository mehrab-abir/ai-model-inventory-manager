const express = require('express');
const controller = require('./model.controller');
const verifyFirebaseToken = require('../../middlewares/verifyFirebaseToken');

const router = express.Router();

router.get('/allmodels', controller.getAllModels);
router.get('/latest', controller.getLatestModels);
router.get('/allmodels/:id', controller.getModelById);
router.post('/addmodel', controller.addModel);
router.get('/update-this-model/:id', controller.getModelForUpdate);
router.patch('/update-model/:id', verifyFirebaseToken, controller.updateModel);
router.delete('/allmodels/:id', verifyFirebaseToken, controller.deleteModel);
router.get('/mymodels', controller.getMyModels);
router.patch('/allmodels/:id', controller.incrementPurchaseCount);
router.patch('/modeldetails/ratings/:id', controller.saveRating);
router.get('/filter-models', controller.filterModels);
router.get('/search-models', controller.searchModels);

module.exports = router;