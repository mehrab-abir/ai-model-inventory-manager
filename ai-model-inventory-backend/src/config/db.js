const { MongoClient, ServerApiVersion } = require('mongodb');
const { dbUser, dbPassword } = require('./env');

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.zvein0m.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;

const connectDB = async () => {
    if (!db) {
        await client.connect();
        db = client.db('ai-model-inventory-db');
        console.log('Connected to MongoDB');
    }
    return db;
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return db;
};

module.exports = connectDB;
module.exports.getDB = getDB;
module.exports.client = client;