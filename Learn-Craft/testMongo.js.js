const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI; // Ensure this is set in your .env file

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('testDB');
        const collection = database.collection('testCollection');

        // Insert a document
        const doc = { name: "John Doe", age: 30 };
        const result = await collection.insertOne(doc);
        console.log(`Document inserted with _id: ${result.insertedId}`);

        // Find the document
        const foundDoc = await collection.findOne({ _id: result.insertedId });
        console.log("Found document:", foundDoc);

        // Update the document
        const updateResult = await collection.updateOne({ _id: result.insertedId }, { $set: { age: 31 } });
        console.log(`${updateResult.modifiedCount} document(s) updated`);

        // Delete the document
        const deleteResult = await collection.deleteOne({ _id: result.insertedId });
        console.log(`${deleteResult.deletedCount} document(s) deleted`);

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
