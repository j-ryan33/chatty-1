const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
// const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();
const bp = require('body-parser');
const { use } = require('express/lib/application');


// var ejs = require('ejs');


// const connection = 'mongodb+srv://doadmin:94B6u27tbJX1P83Q@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=chatty-db';
// const connection = 'mongodb://127.0.0.1/ostaa';
// const connection = 'mongodb+srv://doadmin:94B6u27tbJX1P83Q@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=chatty-db';
const connection = 'mongodb://127.0.0.1/ostaa';

mongoose.connect(connection);
mongoose.connection.on('error', () => {
  console.log('Connection issue with mongoDB :(');
});




// app.use(cookieParser());
app.use(express.static('public_html'));
app.use(express.json());

// app.set("view engine", "ejs");


var Users = new mongoose.Schema( {
  username: String,
  password: String,
  listings: [Number],
  purchases: [Number]
});


var User = mongoose.model('User', Users);

// let myNewUser = new User({
//   username: "helloooothisisaUSER",
//   password: "passwordy-word",
//   listings: [9102842093, 109283],
//   purchases: [52348782, 90821232, 293239, 203293]
// });


// let p = myNewUser.save();
// p.then(() => {
//   console.log('CREATED SUCCESSFULLY');
// });
// p.catch(() => {
//   console.log("no save :(")
// });

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

// let myNewItem = new Item({
//     title: "A ",
//     disc: "It's a truck and has 4 wheels. Goes vroom fr fr",
//     // image: ,
//     price: 1000000000,
//     status: "SALE",
//     sellerUsername: "iwoidjwoidw",
//     buyerUsername: "[NONE]"
//     // sold: Boolean
// });


/*
when an item is bought, use the ".then" to
get it to add it to the user's "purchases" 
list. 
*/


// let p = myNewItem.save();
// p.then(() => {
//   console.log('ITEM CREATED SUCCESSFULLY!!!');
//   // THEN MODIFY THE "purchases" FIELD IN USER SCHEMA

// });
// p.catch(() => {
//   console.log("no save :(")
// });


// app.get('/', function (req, res) {
//   res.render('index.html', {});
// });



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
  // window.location = '/index.html';
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

// var publicPath = path.ssjoin(__dirname, 'public');

// app.get('/', function (req, res) {
//   res.sendFile(publicPath + '/index.html');
// });



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

// app.get('/get/purchases/:usrnm', (req, res) => {
//     let usrnm = req.params.usrnm;
//     let usr = Item.find({category: cat}).exec();
//     usr.then( (results) => { 
//       res.end( JSON.stringify(results) );
//     });
//     usr.catch( (error) => {
//       console.log(error);
//       res.end('FAIL');
//     });
    
// });

app.post('/add/user/', (req, res) => {
  let userToBeSaved = req.body;
  //parameter=value&also=another

  var newUser = new User(userToBeSaved);
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

  console.log("\nthis is Users after the update: ");
  printSchema("user");
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


console.log("item schema:");
printSchema("ejhfkejfh");
console.log("\n\nuser schema:");
printSchema("user");

