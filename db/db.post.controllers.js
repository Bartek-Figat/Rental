require("dotenv").config();
const { MongoClient } = require("mongodb");

const { dbURI } = process.env;

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const insertPost = async (doc) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_post");
    return await collection.insertOne(doc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const findOnePost = async (query) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");

    const collection = database.collection("new_post");
    return await collection.findOne(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const findAllPosts = async (query, options) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_post");
    return collection.find(query, options).limit(3).toArray();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertPost,
  findOnePost,
  findAllPosts,
};
