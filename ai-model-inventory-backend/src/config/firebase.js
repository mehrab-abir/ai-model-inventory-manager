const admin = require('firebase-admin');
const { firebaseServiceKey } = require('./env');

const decoded = Buffer.from(firebaseServiceKey, 'base64').toString('utf8');
const serviceAccount = JSON.parse(decoded);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;