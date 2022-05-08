const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-warehouse-manag.bfvdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryCollection = client.db('electronics-inventory-management').collection('items');

        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryCollection.find(query);
            const inventoryItems = await cursor.toArray();
            res.send(inventoryItems);
        });

        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singleItem = await inventoryCollection.findOne(query);
            res.send(singleItem);
        })
    }

    finally {
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Electronics Inventory Management server is running...")
});

app.listen(port, () => {
    console.log("Listening at", port);
})