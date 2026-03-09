const userService = require('./user.services');

const createUser = async (req, res) => {
    const newUser = req.body;
    const userExist = await userService.getUserByEmail(req.body.email);

    if (userExist) {
        return res.send({ message: 'User already exists. Not posted.' });
    }

    const result = await userService.createUser(newUser);
    res.send(result);
};

const getCurrentUser = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }

    const result = await userService.getUserByEmail(email);

    if (!result) {
        return res.status(404).send({ message: 'User not found' });
    }

    res.send(result);
};

const updateProfile = async (req, res) => {
    const email = req.query.email;
    const { displayName, photoURL } = req.body;

    const updateDoc = {
        displayName,
    };

    if (photoURL) {
        updateDoc.photoURL = photoURL;
    }

    const result = await userService.updateUserProfile(email, updateDoc);
    res.send(result);
};

module.exports = {
    createUser,
    getCurrentUser,
    updateProfile,
};