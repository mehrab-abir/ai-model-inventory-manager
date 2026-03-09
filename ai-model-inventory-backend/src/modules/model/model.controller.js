const modelService = require('./model.services');

const getAllModels = async (req, res) => {
    const result = await modelService.getAllModels();
    res.send(result);
};

const getLatestModels = async (req, res) => {
    const result = await modelService.getLatestModels();
    res.send(result);
};

const getModelById = async (req, res) => {
    const { id } = req.params;
    const result = await modelService.getModelById(id);
    res.send(result);
};

const addModel = async (req, res) => {
    const newModel = req.body;
    const result = await modelService.addModel(newModel);
    res.send(result);
};

const getModelForUpdate = async (req, res) => {
    const { id } = req.params;
    const result = await modelService.getModelById(id);
    res.send(result);
};

const updateModel = async (req, res) => {
    const { id } = req.params;
    const updatedModel = req.body;

    const model = await modelService.getModelById(id);

    if (model.createdBy !== req.token_email) {
        return res.status(403).send({ message: 'forbidden access' });
    }

    const result = await modelService.updateModel(id, updatedModel);
    res.send(result);
};

const deleteModel = async (req, res) => {
    const { id } = req.params;
    const model = await modelService.getModelById(id);

    if (model.createdBy !== req.token_email) {
        return res.status(403).send({ message: 'forbidden access' });
    }

    const result = await modelService.deleteModel(id);
    res.send(result);
};

const getMyModels = async (req, res) => {
    const { email } = req.query;
    const result = await modelService.getMyModels(email);
    res.send(result);
};

const incrementPurchaseCount = async (req, res) => {
    const { id } = req.params;
    const result = await modelService.incrementPurchaseCount(id);
    res.send(result);
};

const saveRating = async (req, res) => {
    const { id } = req.params;
    const ratingValue = Number(req.body.ratingValue);
    const userEmail = req.body.userEmail;

    if (ratingValue === 0) {
        return res.send({ message: 'Nothing posted' });
    }

    const result = await modelService.saveRating(id, ratingValue, userEmail);
    res.send(result);
};

const filterModels = async (req, res) => {
    const { framework } = req.query;
    const result = await modelService.filterModels(framework);
    res.send(result);
};

const searchModels = async (req, res) => {
    const name = req.query.name ?? '';
    const result = await modelService.searchModels(name);
    res.send(result);
};

module.exports = {
    getAllModels,
    getLatestModels,
    getModelById,
    addModel,
    getModelForUpdate,
    updateModel,
    deleteModel,
    getMyModels,
    incrementPurchaseCount,
    saveRating,
    filterModels,
    searchModels,
};