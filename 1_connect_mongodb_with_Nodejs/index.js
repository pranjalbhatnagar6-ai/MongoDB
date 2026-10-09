import express from 'express'
import { MongoClient } from 'mongodb';

const app = express();
const dbname = "school"
const url = "mongodb://localhost:27017"

const client = new MongoClient(url) //making client

// 2_Display data on UI
app.set('view engine','ejs')
// app.get("/",async (req,resp)=>{
//     await client.connect() //connecting client
//     const db = client.db(dbname); //get db via client
//     const collection = db.collection('students')
//     const students = await collection.find().toArray()
//     console.log(students);
//     resp.render('students',{students})
// })

// Make API
client.connect().then((connection)=>{
    const db = connection.db(dbname);

    app.get("/api",async (req,resp)=>{
        const collection = db.collection('students')
        const students = await collection.find().toArray()
        resp.send(students);
        resp.render('students',{students})
    })

    app.get("/ui",async (req,resp)=>{
        const collection = db.collection('students')
        const students = await collection.find().toArray()
        // resp.send(students);
        resp.render('students',{students})
    })
})

app.listen(3200)