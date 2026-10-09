import express from 'express'
import { MongoClient } from 'mongodb';

const app = express();

const dbname = "school"
const url = "mongodb://localhost:27017"

const client = new MongoClient(url) //making client

async function dbConnection(){
    await client.connect() //connecting client
    const db = client.db(dbname); //get db via client
    const collection = db.collection('students')
    const result = await collection.find().toArray()
    console.log(result);
}

dbConnection()

app.listen(3200)