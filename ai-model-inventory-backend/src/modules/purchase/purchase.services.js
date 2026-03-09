const { ObjectId } = require('mongodb');
const { getDB } = require('../../config/db');

const getPurchaseCollection = () => getDB().collection('purchased-models');

const createPurchase = async (model) => {
    const modelToPurchase = {
        ...model,
        purchasedModelId: new ObjectId(model.purchasedModelId),
    };

    return await getPurchaseCollection().insertOne(modelToPurchase);
};

const getPurchasedModelsByEmail = async (email) => {
    return await getPurchaseCollection()
        .aggregate([
            { $match: { purchasedBy: email } },
            {
                $lookup: {
                    from: 'ai-models',
                    localField: 'purchasedModelId',
                    foreignField: '_id',
                    as: 'purchased_model',
                },
            },
            { $unwind: '$purchased_model' },
        ])
        .toArray();
};

module.exports = {
    createPurchase,
    getPurchasedModelsByEmail,
};