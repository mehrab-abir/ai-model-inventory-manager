const express = require('express');
const app = express();
const admin = require("firebase-admin");
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

const decoded = Buffer.from(process.env.FIREBASE_SERVICE_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());
app.use(cors());

//jwt token virification
const verifyFirebaseToken = async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message: "unauthorized access"});
    }

    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).send({ message: "unauthorized access" });
    }

    try{
        const decode = await admin.auth().verifyIdToken(token);
        req.token_email = decode.email;

        next();
    }
    catch{
        return res.status(401).send({ message: "unauthorized access" });
    }
}

app.get('/', (req, res) => {
    res.send("'AI Inventory Manager' Server is running");
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zvein0m.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();

        const db = client.db("ai-model-inventory-db");
        const userCollection = db.collection("users");
        const aiModelCollection = db.collection("ai-models");
        const purchasedCollection = db.collection("purchased-models");

        //get all models
        app.get('/allmodels', async (req, res) => {
            const allmodels = await aiModelCollection.find().toArray();
            res.send(allmodels);
        })

        //get latest 6 models
        app.get('/latest', async (req, res) => {
            const latest = await aiModelCollection.find().sort({ created_at: 1 }).limit(6).toArray();
            res.send(latest);
        })

        //details of a specific model
        app.get('/allmodels/:id', async (req, res) => {
            const id = req.params.id;
            const modelDetails = await aiModelCollection.findOne({ _id: new ObjectId(id) });
            res.send(modelDetails);
        })

        //add a model
        app.post('/addmodel', async (req, res) => {
            const newModel = req.body;
            const afterPost = await aiModelCollection.insertOne(newModel);
            res.send(afterPost);
        })

        //get the model that is to be updated 
        app.get('/update-this-model/:id', async (req, res) => {
            const id = req.params.id;
            const thisModel = await aiModelCollection.findOne({ _id: new ObjectId(id) });
            res.send(thisModel);
        })

        //update a model
        app.patch('/update-model/:id', verifyFirebaseToken, async (req, res) => {
            // console.log('Headers, ',req.headers)
            const updatedModel = req.body;
            const id = req.params.id;

            const model = await aiModelCollection.findOne({_id: new ObjectId(id)});

            if(model.createdBy !== req.token_email){
                return res.status(403).send({message: "forbidden access"});
            }

            const afterUpdate = await aiModelCollection.updateOne({ _id: new ObjectId(id) },
                {
                    $set : updatedModel
                }
            );
            res.send(afterUpdate);
        })

        //delete a model
        app.delete('/allmodels/:id',verifyFirebaseToken, async (req,res)=>{
            const id = req.params.id;
            const model = await aiModelCollection.findOne({_id : new ObjectId(id)});

            if(model.createdBy !== req.token_email){
                return res.status(403).send({message: "forbidden access"});
            }

            const afterDelete = await aiModelCollection.deleteOne({_id:new ObjectId(id)});
            res.send(afterDelete);
        })

        //get my models - posted by the user
        app.get('/mymodels',async (req,res)=>{
            const email = req.query.email;
            const mymodels = await aiModelCollection.find({createdBy : email}).toArray();
            res.send(mymodels);
        })


        //add a model to purchasedCollection
        app.post('/purchase-models',async (req,res)=>{
            const model = req.body;

            const modelToPurchase = { ...model, purchasedModelId: new ObjectId(model.purchasedModelId)};

            const afterPost = await purchasedCollection.insertOne(modelToPurchase);
            res.send(afterPost);
        })

        //getting all purchased models - purchased by the logged in user
        app.get('/purchase-models',async (req,res)=>{
            const email = req.query.email;

            const myPurchasedModels = await purchasedCollection.aggregate([
                {$match: {purchasedBy : email}},
                {
                    $lookup : {
                        from : "ai-models",
                        localField: "purchasedModelId",
                        foreignField : "_id",
                        as : "purchased_model"
                    }
                },
                {$unwind : "$purchased_model"},
            ]).toArray();
            res.send(myPurchasedModels);
        })

        //update purchase count of a model
        app.patch('/allmodels/:id',async (req,res)=>{
            const id = req.params.id;
            const afterIncrement = await aiModelCollection.updateOne({_id:new ObjectId(id)},
            {
                $inc : {purchased : 1}
            }
        );
        res.send(afterIncrement);
        })

        //filter models by framework
        app.get('/filter-models',async (req,res)=>{
            const { framework } = req.query;

            const query = framework ? { framework } : {};
            const result = await aiModelCollection.find(query).toArray();

            res.send(result);
        })

        //search models by name
        app.get('/search-models',async (req,res)=>{
            const {name} = req.query;
            const result = await aiModelCollection.find({name: {$regex: name, $options : 'i'}}).toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const userExist = await userCollection.findOne({ email: req.body.email });

            if (userExist) {
                res.send({ message: "User already exists. Not posted." });
            }
            else {
                const afterPost = await userCollection.insertOne(newUser);
                res.send(afterPost);
            }
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})