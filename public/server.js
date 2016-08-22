var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Field = require('./controllers/Field.model');
var app = express();

//-------------------------------------------------------------------------------------------------------------------
//
//uses public and the folder where to find the index page
app.use(express.static(__dirname));

//parses the body like json
app.use(bodyParser.json());


//-------------------------------------------------------------------------------------------------------------------
//
//open a connection to the database
var db ='mongodb://localhost/game';
mongoose.connect(db, function(err,doc){
    if(!err){
        console.log('Connected to the Database');
    }else{
        console.log("the error when connecting to the database is: " + err);
    }
});

//
//find all the items in the database
Field.find(function(err, docs){
       //console.log("from the field model js " + docs);
   });

//-------------------------------------------------------------------------------------------------------------------
//Sends a get request to the database for all the items and responds back to the controller with the list called docs
//also sends the server a message saying the below message
app.get('/findAll', function(req, res){
        console.log("Game initial get request successful");  
        Field.find(function(err, docs){
            //console.log("From the get request!: " + docs);
            res.json(docs);
        });

});



//Updates the level of the field in the database using a put request and an update function
app.put('/updateLevel/:id', function(req, res){
    var id = req.params.id;
    //console.log('Update Request for id: ' + id);
    var stock = req.body.stock;
    console.log(stock);
    Field.update(
        {"_id": id},
        {
            $inc:{"level": 1},
            $set:{"stock": stock}
        }, function(err, docs){
                if(!err){
                    console.log(docs);
                    res.json(docs);  
                }
                else{
                    console.log(err);
                }
                        
        }
    );
});

//Updates the level of the field in the database using a put request and an update function
app.put('/newDatabaseStock/:id', function(req, res){
    var id = req.params.id;
    console.log('key id: ', id);
    var stock = req.body.stock;
    console.log('key stock: ', stock);
    Field.update({"_id": id}, {"stock": stock}, function(err, docs){
                if(!err){
                    console.log(docs);
                    res.json(docs);  
                }
                else{
                    console.log(err);
                }
                        
    });
});


/*
//Updates the level of the field in the database using a put request and an update function
app.put('/game/:id', function(req, res){
    var stock = req.params;
    //console.log('Update the stock = ' + stock);
    console.log(req.body);
    db.game.update({"_id": mongojs.ObjectId(id)}, {"stock": req.body.stock}, function(err, docs){
                //console.log("hihihi");
                console.log(docs);
                console.log(err);
                res.json(docs);        
    });
});
*/
//says which port the server is active
app.listen(3000);
console.log("server running on port 3000");



