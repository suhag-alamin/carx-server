const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

const app = express();

const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

// connection uri

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qow90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("carX");
    const carCollection = database.collection("cars");
    const reviewCollection = database.collection("reviews");

    // get cars api and pagination
    app.get("/cars", async (req, res) => {
      const cursor = carCollection.find({});
      const page = req.query.page;
      const size = parseInt(req.query.size);
      let cars;
      const count = await cursor.count();
      if (page) {
        cars = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
        cars = await cursor.toArray();
      }
      res.send({ count, cars });
    });

    // get reviews api
    app.get("/reviews", async (req, res) => {
      const reviews = await reviewCollection.find({}).toArray();
      res.send(reviews);
    });
  } finally {
    // await client.close()
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Carx Server is running");
});

app.listen(port, () => {
  console.log(`Carx Server listening at ${port}`);
});
