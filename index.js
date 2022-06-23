
    var express = require("express");
    var bodyparser= require("body-parser");
    const mongoose = require("mongoose");
    const data  = require('C:/Users/ASUS/Desktop/api/data.json');
    const { ifError } = require("assert");
    const { MongoClient, Db } = require("mongodb");

    var app =express();


    app.use(bodyparser.json());
    app.use(express.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    var database
    const url = 'mongodb://localhost:27017/mydb';

    mongoose.connect(url,{ useNewUrlParser:true},err =>err ? console.log(err) : console.log("connected to db"));

    app.get("/",(req,res)=>{
            res.json(data)
        
    })

    MongoClient.connect(url,function(err, db) {

        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('customers').find({}).toArray((err,result)=>{
            if (err) throw err;
            console.log(result);
            db.close()
            
        })


        
    
    })

    app.get('/mongo',(req,res)=>{
        MongoClient.connect(url,function(err, db) {

            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection('customers').find({}).toArray((err,result)=>{
                if (err) throw err;
                res.json(result)
                db.close()
                
            });     
        });
    });


    //var nameSchema = new mongoose.Schema({
    //   name: String,
    // salary: String
    //});
    //var User = mongoose.model("User", nameSchema);


    app.get('/add',(req,res)=>{
        res.sendFile('C:/Users/ASUS/Desktop/api/index.html')
    });

    //////////////////////////////////////////////////////////
    app.post('/add',(req,res)=>{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");

            var myobj = req.body;
            dbo.collection("Users").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            
        
        
        //myData.save()

        //.then(item => {
        //res.send("item saved to database");
        })
        //.catch(err => {
        //res.status(400).send("unable to save to database");
        })  ;
        res.send(req.body)
    });


    app.listen(3000)