
    var express = require("express");
    var bodyparser= require("body-parser");
    const mongoose = require("mongoose");
    const data  = require('C:/Users/ASUS/Desktop/api/data.json');
    const { ifError } = require("assert");
    const { MongoClient, Db } = require("mongodb");
const { Console } = require("console"); 
var ObjectId = require('mongodb');
const { json } = require("body-parser");
mongo = require("mongodb");
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
        dbo.collection('Users').find({}).toArray((err,result)=>{
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


     app.get('/add',(req,res)=>{
         res.sendFile('C:/Users/ASUS/Desktop/api/index.html')
     });

     app.post('/add',(req,res)=>{
         MongoClient.connect(url, function(err, db) {
             if (err) throw err;
             var dbo = db.db("mydb");

             var myobj = req.body;
             dbo.collection("Users").insertOne(myobj, function(err, res) {
                 if (err) throw err;
                 console.log("1 document inserted");
             })
         })  ;
     res.send(req.body)
 });




app.delete('/delete/:id',(req,res)=>{
    var id = req.params.id;
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("Users").deleteOne(({ _id :  new mongo.ObjectId(id) }),(err,result)=>{
            if(err) throw err;
            console.log(result)

        });
        
    })
    res.json({success : id})
})

app.post('/update',(req,res)=>{
        
    MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        var dbo = db.db("mydb");
        //var id = ObjectId(req.body.id)
        dbo.collection("Users").findOneAndUpdate({_id : new mongo.ObjectId(req.body.id) },{$set :{name : req.body.name,salary: req.body.salary}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            
            res.json(doc);
        });


})
})

 app.listen(3000)