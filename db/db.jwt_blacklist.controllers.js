require("dotenv").config();
const { MongoClient } = require("mongodb");

const { dbURI } = process.env;

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const insertJwt = async (doc) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("jwt_blacklist");
    return await collection.insertOne(doc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const findOneJwt = async (query) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");

    const collection = database.collection("jwt_blacklist");
    return await collection.findOne(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const findAllJwt = async (query, options) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("jwt_blacklist");
    return collection.find(query, options).toArray();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertJwt,
  findOneJwt,
  findAllJwt,
};
