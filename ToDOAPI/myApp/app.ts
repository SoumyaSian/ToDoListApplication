import express = require('express');
import bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app: express.Application = express();
let db: any;


MongoClient.connect('mongodb://localhost:27017/', (err: any, client: any) => {
    // ... start the server
    console.log('err: ', err);
    db = client.db('sian');
    app.listen(3000, function () {
        console.log('My application is listening on port 3000 :):)')
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req:any, res:any) => {
    res.send('Hello Sian');
});

app.post('/todoList', function (req:any, res:any) {
    console.log("Request Body: ", req.body);
    db.collection('toDoList').insertMany(req.body, function (err:any, results:any) {
        if (err) {
            console.log('err: ', err);
            res.send(err);
        }
        else {
            console.log('Task Saved ...', results);
            res.send(results);
        }
    });
});
