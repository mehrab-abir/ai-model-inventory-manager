require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    firebaseServiceKey: process.env.FIREBASE_SERVICE_KEY,
};