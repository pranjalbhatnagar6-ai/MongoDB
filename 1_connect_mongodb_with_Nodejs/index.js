import express from 'express'
import { MongoClient } from 'mongodb';

const app = express();

const dbname = "school"
const url = "mongodb://localhost:27017"

const client = new MongoClient(url)

async function dbConnection(){
    await client.connect()
    const db = client.db(dbname);
    const collection = db.collection('students')
    const result = collection.find()
    console.log(result);
}

dbConnection()