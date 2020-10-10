require("dotenv").config();
const { MongoClient } = require("mongodb");

const { dbURI } = process.env;

const dbOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const insertUser = async (doc) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.insertOne(doc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const insertManyUsers = async (docs) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.insertMany(docs);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const findOneUser = async (query) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.findOne(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const findAllUsers = async (query, options) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return collection.find(query, options).limit(3).toArray();
  } catch (error) {
    console.log(error);
  }
};

const userPagination = async (query, options, pagination) => {
  const { limit, skip } = pagination;

  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return collection.find(query, options).skip(skip).limit(limit).toArray();
  } catch (error) {
    console.log(error);
  }
};

const findOneAndUpdate = async (filter, options, updateDoc) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.findOneAndUpdate(filter, options, updateDoc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const updateManyUsers = async (filter, updateDoc) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.updateOne(filter, updateDoc);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const replaceOneUsers = async (query, replacement, options) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.updateOne(query, replacement, options);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const deleteOneUser = async (query) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.deleteOne(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const deleteManyUser = async (query) => {
  const client = new MongoClient(dbURI, dbOptions);
  try {
    await client.connect();
    const database = client.db("test");
    const collection = database.collection("new_collection");
    return await collection.deleteMany(query);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

module.exports = {
  insertUser,
  insertManyUsers,
  findOneUser,
  findAllUsers,
  updateManyUsers,
  replaceOneUsers,
  deleteOneUser,
  deleteManyUser,
  userPagination,
  findOneAndUpdate,
};
