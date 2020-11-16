require("dotenv").config();
const { MongoClient } = require("mongodb");

const { dbURI } = process.env;

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const client = new MongoClient(dbURI, dbOptions);

module.exports = async () => {
 try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to Client DB");
  } finally {
    await client.close();
  }
}

