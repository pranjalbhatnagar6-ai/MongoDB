import express from 'express'
import { MongoClient } from 'mongodb';

const app = express();
// 4_Middleware to Save Data of form in Mongodb
app.use(express.urlencoded({extended:true}))

// To Get data from POST API for save data in mongodb
app.use(express.json());

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

// 3_Make API
client.connect().then((connection)=>{
    const db = connection.db(dbname);

    app.get("/api",async (req,resp)=>{
        const collection = db.collection('students')
        const students = await collection.find().toArray()
        resp.send(students);
        resp.render('students',{students})
    })

    // get data through EJS file
    app.get("/ui",async (req,resp)=>{
        const collection = db.collection('students')
        const students = await collection.find().toArray()
        // resp.send(students);
        resp.render('students',{students})
    })

    // 4_Save Data with form in Mongodb
    app.get("/add",(req,resp)=>{
        resp.render('add-student')
    })
        // POST METHOD AND ROUTE
        app.post("/add-student",async (req,resp)=>{
        const collection = db.collection('students')
        const result = await collection.insertOne(req.body)
        console.log(result)
        resp.send("Data Saved");
    })

    // 5_POST API for save data in mongodb
    app.post("/add-student-api",async (req,resp)=>{
        console.log(req.body)
        const collection = db.collection('students')
        const result = await collection.insertOne(req.body)
        resp.send({"message":req.body})
    })
    
})

app.listen(3200)