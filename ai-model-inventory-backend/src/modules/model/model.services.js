const { ObjectId } = require('mongodb');
const { getDB } = require('../../config/db');

const getModelCollection = () => getDB().collection('ai-models');

const getAllModels = async () => {
    return await getModelCollection().find().sort({ createdAt: -1 }).toArray();
};

const getLatestModels = async () => {
    return await getModelCollection().find().sort({ createdAt: -1 }).limit(6).toArray();
};

const getModelById = async (id) => {
    return await getModelCollection().findOne({ _id: new ObjectId(id) });
};

const addModel = async (newModel) => {
    return await getModelCollection().insertOne(newModel);
};

const updateModel = async (id, updatedModel) => {
    return await getModelCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedModel }
    );
};

const deleteModel = async (id) => {
    return await getModelCollection().deleteOne({ _id: new ObjectId(id) });
};

const getMyModels = async (email) => {
    return await getModelCollection().find({ createdBy: email }).toArray();
};

const incrementPurchaseCount = async (id) => {
    return await getModelCollection().updateOne(
        { _id: new ObjectId(id) },
        { $inc: { purchased: 1 } }
    );
};

const saveRating = async (id, ratingValue, userEmail) => {
    const newRating = { userEmail, rating: ratingValue };

    const updated = await getModelCollection().updateOne(
        { _id: new ObjectId(id), 'ratings.userEmail': userEmail },
        {
            $set: { 'ratings.$.rating': ratingValue },
        }
    );

    if (updated.matchedCount === 0) {
        await getModelCollection().updateOne(
            { _id: new ObjectId(id) },
            {
                $push: { ratings: newRating },
            }
        );
    }

    const reCalculated = await getModelCollection().updateOne(
        { _id: new ObjectId(id) },
        [
            {
                $set: {
                    ratingCount: { $size: '$ratings' },
                    ratingAvg: { $avg: '$ratings.rating' },
                },
            },
        ]
    );

    const avgRating = await getModelCollection().findOne(
        { _id: new ObjectId(id) },
        { projection: { ratingAvg: 1 } }
    );

    return {
        message: 'Rating saved and stats updated',
        ratingAvg: avgRating.ratingAvg,
        updated: updated.matchedCount === 1,
        reCalculated,
    };
};

const filterModels = async (framework) => {
    const query = framework ? { framework } : {};
    return await getModelCollection().find(query).toArray();
};

const searchModels = async (name) => {
    if (!name || !name.trim()) {
        return await getModelCollection().find().toArray();
    }

    return await getModelCollection()
        .find({ name: { $regex: name.trim(), $options: 'i' } })
        .toArray();
};

module.exports = {
    getAllModels,
    getLatestModels,
    getModelById,
    addModel,
    updateModel,
    deleteModel,
    getMyModels,
    incrementPurchaseCount,
    saveRating,
    filterModels,
    searchModels,
};