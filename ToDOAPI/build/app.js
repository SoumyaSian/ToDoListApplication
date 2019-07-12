"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* This also can be written like
* let express = require('express');
* import express from 'express';
*/
var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var app = express();
var db;
MongoClient.connect('mongodb://localhost:27017/', function (err, client) {
    // ... start the server
    console.log('err: ', err);
    console.log('database: ', client);
    db = client.db('sian');
    app.listen(3000, function () {
        console.log('My application is listening on port 3000 :):)');
    });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello Sian');
});

app.post('/todoList', function (req, res) {
    console.log("Request Body: ", req.body);
    db.collection('toDoList').insertMany(req.body, function (err, results) {
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
