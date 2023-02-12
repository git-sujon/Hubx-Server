const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.prabmlk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  const usersCollection = client.db("hubx").collection("usersCollection");

  try {
    app.get("/users", async(req, res) => {
      const users = await usersCollection.find({}).toArray()
      res.send(users)
    });

    app.post("/users", async(req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user)
      res.send(result)
    });


  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hux Server running");
});

app.listen(port, () => {
  console.log(port, "Alive Server");
});
