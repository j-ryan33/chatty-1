/*
Author:  Julia Ryan
Course:  CSC337 (FA23, Ben)
Project: PA9 - Ostaa
File:    server.js

Creates server javascript code.
*/

const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
// const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
const bp = require('body-parser');
const { use } = require('express/lib/application');
const connection = 'mongodb+srv://doapps-01f70429-fac0-4ba6-83ed-369febb34dfd:H864cjg7BG91Mp32@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?authSource=admin&tls=true';

mongoose.connect(connection);
mongoose.connection.on('error', () => {
  console.log('Connection issue with mongoDB :(');
});

// app.use(cookieParser());
app.use(express.static('public_html'));
app.use(express.json());

var Users = new mongoose.Schema( {
  username: String,
  password: String,
  listings: [Number],
  purchases: [Number]
});

var User = mongoose.model('User', Users);

var Items = new mongoose.Schema( {
    title: String,
    disc: String,
    image: String,
    price: Number,
    status: String,
    sellerUsername: String,
    buyerUsername: String
});

var Item = mongoose.model('Item', Items);


/*
when an item is bought, use the ".then" to
get it to add it to the user's "purchases" 
list. 
*/



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public_html/index.html');
  // let head = document.getElementsByTagName('HEAD')[0];
 
        // // Create new link Element
        // let link = document.createElement('link');
 
        // // set the attributes for link element
        // link.rel = 'stylesheet';
     
        // link.type = 'text/css';
     
        // link.href = 'oosta_style.css';
 
        // // Append link element to HTML head
        // head.appendChild(link);
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public_html/index.html');
});

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public_html/index.html');

});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public_html/index.html');
});

app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/public_html/home.html');
});

app.get('/home.html', function (req, res) {
  res.sendFile(__dirname + '/public_html/home.html');
});

app.get('/post', function (req, res) {
  res.sendFile(__dirname + '/public_html/post.html');
});

app.get('/post.html', function (req, res) {
  res.sendFile(__dirname + '/public_html/post.html');
});




app.get('/get/users/', (req, res) => {
    let all = User.find({}).exec();
    all.then((results) => { 
      res.end(JSON.stringify(results));
    });
    all.catch((error) => {
      console.log(error);
      res.end('NO GOOD.');
    });
});

app.get('/get/items/', (req, res) => {
    let all = Item.find({}).exec();
    all.then((results) => { 
      res.end(JSON.stringify(results));
    });
    all.catch((error) => {
      console.log(error);
      res.end('NO GOOD.');
    });
});

app.get('/get/user/:username'), (req, res) =>{
  let usrnm = req.params.username;
  let usr = User.find({ username: usrnm});
  usr.then( (results) => { 
    res.end( JSON.stringify(results) );
  });
  usr.catch( (error) => {
    console.log(error);
    res.end('FAIL');
  });
}

app.post('/add/user/:usrname/:pass', (req, res) => {
  console.log("saving user....");
  // let userToBeSaved = req.body;

  let userName = req.params.usrname;
  let passWord = req.params.pass;
  //parameter=value&also=another

  var newUser = new User({username: userName, password: passWord});
  let newUsr = newUser.save();

  newUsr.then( (doc) => { 
    res.end('SAVED SUCCESFULLY');
  });
  newUsr.catch( (err) => { 
    console.log("COULD NOT CREATE USER!!!");
    res.end("COULD NOT CREATE USER!!!");
  });
});


app.post('/add/item/', (req, res) => {
  let itemToBeSaved = req.body;
  // parameter=value&also=another
  var newItem = new Item(userToBeSaved);
  let itemSaved = newItem.save();
  itemSaved.then( (doc) => { 
    res.end('SAVED SUCCESFULLY');
    /*
    !!!!!!!!!!!!!!!!!!!!!!
    ADD HERE: add it to the "listings" list of the user
    */
  });
  itemSaved.catch( (err) => { 
    console.log("COULD NOT CREATE USER!!!");
    res.end("COULD NOT CREATE USER!!!");
  });
});



console.log("here!!!");


function addListingToUser(paramUsername, listingToAdd){
  let bb = User.findOneAndUpdate(
    {username : paramUsername},
    {
      $push: {listings : listingToAdd}
    },
    {strict: true}
  );

  bb.then(() =>{
    console.log("here!!!");
  })

  console.log("\nthis is Users after the update: ");
  printSchema("user");
}



function addPurchaseToUser(paramUsername, purchaseToAdd){
  let bb = User.findOneAndUpdate(
    {username : paramUsername},
    {
      $push: {purchases : purchaseToAdd}
    },
    {strict: true}
  );

  bb.then(() =>{
    console.log("here!!!");
  })

  // console.log("\nthis is Users after the update: ");
  // printSchema("user");
}




function printSchema(t){
  /*
  FUNCTION FOR TESTING

  prints the schema
  */
  if ((t == "user")|| (t == "users") || (t==1) || (t==0)){
    let q = User.find({});
    q.then((documents) => {
      console.log("[ ");
      for (let i = 0; i < documents.length; i++){
        console.log(documents[i]);
      }
      console.log(" ]");
    } )
  }
  else{
    //
    let q = Item.find({});
    q.then((documents) => {
      console.log("[ ");
      for (let i = 0; i < documents.length; i++){
        console.log(documents[i]);
      }
      console.log(" ]");
    } )
  }
}



const port = 3000;
app.listen(port, () => { console.log('server has started and is running on localhost %d', port); });



