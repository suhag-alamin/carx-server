const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const admin = require("firebase-admin");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const app = express();

const port = process.env.PORT || 5000;

// firebase admin sdk

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// middle ware
app.use(cors());
app.use(express.json());

// connection uri

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qow90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// verify token
async function verifyToken(req, res, next) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      req.decodedEmail = decodedUser.email;
    } catch {}
  }

  // next step
  next();
}

// run server
async function run() {
  try {
    await client.connect();
    const database = client.db("carX");
    const carCollection = database.collection("cars");
    const reviewCollection = database.collection("reviews");
    const orderCollection = database.collection("orders");
    const userCollection = database.collection("users");
    const messageCollection = database.collection("messages");

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

    // get a singel car api
    app.get("/cars/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await carCollection.findOne(query);
      res.send(result);
    });

    // get reviews api
    app.get("/reviews", async (req, res) => {
      const reviews = await reviewCollection.find({}).toArray();
      res.send(reviews);
    });

    // get all orders
    app.get("/allOrders", verifyToken, async (req, res) => {
      const requester = req.decodedEmail;
      if (requester) {
        const orders = await orderCollection.find({}).toArray();
        res.send(orders);
      } else {
        res.status(403).json({ message: "You do not have access." });
      }
    });

    // get a single order
    app.get("/allOrders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.findOne(query);
      res.send(result);
    });

    // get order by user emails
    app.get("/orders", verifyToken, async (req, res) => {
      const email = req.query.email;
      const requester = req.decodedEmail;
      if (requester) {
        const query = { userEmail: email };
        const cursor = orderCollection.find(query);
        const orders = await cursor.toArray();
        res.json(orders);
      } else {
        res.status(403).json({ message: "You do not have access." });
      }
    });

    // post a product api
    app.post("/cars", async (req, res) => {
      const car = req.body;
      const result = await carCollection.insertOne(car);
      res.json(result);
    });

    // post order api
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.json(result);
    });

    // update order for payment
    app.put("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const payment = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          payment: payment,
        },
      };
      const result = await orderCollection.updateOne(filter, updateDoc);
      res.json(result);
    });

    // stripe payment
    app.post("/create-payment-intent", async (req, res) => {
      const paymentInfo = req.body;
      const amount = paymentInfo.price * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    });

    // post review api
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.json(result);
    });

    // post a message api
    app.post("/messages", async (req, res) => {
      const message = req.body;
      const result = await messageCollection.insertOne(message);
      res.json(result);
    });

    // save users
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.json(result);
    });

    // make admin

    app.get("/users/:email", verifyToken, async (req, res) => {
      const requester = req.decodedEmail;
      if (requester) {
        const email = req.params.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        let isAdmin = false;
        if (user?.role === "admin") {
          isAdmin = true;
        }
        res.json({ admin: isAdmin });
      } else {
        res.status(403).json({ message: "You do not have access." });
      }
    });

    app.put("/users/admin", verifyToken, async (req, res) => {
      console.log(req.decodedEmail);
      const user = req.body;

      const requester = req.decodedEmail;
      if (requester) {
        const requesterAccount = await userCollection.findOne({
          email: requester,
        });
        if (requesterAccount.role === "admin") {
          const filter = { email: user?.email };
          const updateDoc = {
            $set: {
              role: "admin",
            },
          };
          const result = await userCollection.updateOne(filter, updateDoc);
          res.json(result);
        }
      } else {
        res.status(403).json({ message: "You do not have access." });
      }
    });

    // for google login
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.json(result);
    });

    // update a product (car) api
    app.put("/cars/:id", async (req, res) => {
      const id = req.params.id;
      const updatedCar = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          carName: updatedCar.carName,
          price: updatedCar.price,
          img: updatedCar.img,
        },
      };
      const result = await carCollection.updateOne(filter, updateDoc, options);
      res.json(result);
    });

    // update order status api
    app.put("/allOrders/:id", async (req, res) => {
      const id = req.params.id;
      const updateOrder = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: updateOrder.status,
        },
      };
      const result = await orderCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    // delete a car api
    app.delete("/cars/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await carCollection.deleteOne(query);
      res.json(result);
    });

    // delete an order api
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.json(result);
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
