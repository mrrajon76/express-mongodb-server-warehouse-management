const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const uri = "mongodb+srv://mrrajon01:GEW4hD9rmf6zCnt@cluster-warehouse-manag.bfvdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log("db connected...");
    // perform actions on the collection object
    client.close();
});



app.get('/', (req, res) => {
    res.send("Warehouse Management server is running...")
});

app.listen(port, () => {
    console.log("Listening at", port);
})