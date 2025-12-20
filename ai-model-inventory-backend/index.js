const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("'AI Inventory Manager' Server is running");
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zvein0m.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const db = client.db("ai-model-inventory-db");
        const userCollection = db.collection("users");
        const aiModelCollection = db.collection("ai-models");

        //get all models
        app.get('/allmodels',async (req,res)=>{
            const allmodels = await aiModelCollection.find().toArray();
            res.send(allmodels);
        })

        //get latest 6 models
        app.get('/latest',async (req,res)=>{
            const latest = await aiModelCollection.find().sort({created_at:-1}).limit(6).toArray();
            res.send(latest);
        })

        //details of a specific model
        app.get('/allmodels/:id',async (req,res)=>{
            const id = req.params.id;
            const modelDetails = await aiModelCollection.findOne({_id : new ObjectId(id)});
            res.send(modelDetails);
        })

        //add a model
        app.post('/addmodel',async (req,res)=>{
            const newModel = req.body;
            const afterPost = await aiModelCollection.insertOne(newModel);
            res.send(afterPost);
        })

        //update a model
        app.get('/update-this-model',async (req,res)=>{
            const email = req.query.email;
            const thisModel = await aiModelCollection.findOne({createdBy : email});
            res.send(thisModel);
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