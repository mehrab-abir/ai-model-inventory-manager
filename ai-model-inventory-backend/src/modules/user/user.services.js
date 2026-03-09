const { getDB } = require('../../config/db');

const getUserCollection = () => getDB().collection('users');

const createUser = async (newUser) => {
    return await getUserCollection().insertOne(newUser);
};

const getUserByEmail = async (email) => {
    return await getUserCollection().findOne({ email });
};

const updateUserProfile = async (email, updateDoc) => {
    return await getUserCollection().updateOne(
        { email },
        { $set: updateDoc }
    );
};

module.exports = {
    createUser,
    getUserByEmail,
    updateUserProfile,
};