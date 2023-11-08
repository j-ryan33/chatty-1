const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
// const cookieParser = require('cookie-parser');
const app = express();
const router = express.Router();


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

let myNewUser = new User({
  username: "helloooothisisaUSER",
  password: "passwordy-word",
  listings: [9102842093, 109283],
  purchases: [52348782, 90821232, 293239, 203293]
});


let p = myNewUser.save();
p.then(() => {
  console.log('CREATED SUCCESSFULLY');
});
p.catch(() => {
  console.log("no save :(")
});

var Items = new mongoose.Schema( {
    title: String,
    disc: String,
    image: String,
    price: Number,
    status: String,
    username: String
});

var Item = mongoose.model('Item', Items);

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

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public_html/index.html');
});

app.get('/home', function (req, res) {
  res.sendFile(__dirname + '/public_html/home.html');
});

app.get('/post', function (req, res) {
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

app.get('/get/purchases/:usrnm', (req, res) => {
    let usrnm = req.params.usrnm;
    let usr = Item.find({category: cat}).exec();
    usr.then( (results) => { 
      res.end( JSON.stringify(results) );
    });
    usr.catch( (error) => {
      console.log(error);
      res.end('FAIL');
    });
    
});

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


const port = 3000;
app.listen(port, () => { console.log('server has started and is running on localhost %d', port); });


