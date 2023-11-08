const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const app = express();


// const connection = 'mongodb+srv://doadmin:94B6u27tbJX1P83Q@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=chatty-db';
// const connection = 'mongodb+srv://doapps-01f70429-fac0-4ba6-83ed-369febb34dfd:H864cjg7BG91Mp32@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?authSource=admin&tls=true';
// const connection = 'mongodb+srv://juliaryan:passwordpassword123@cluster0.f48qsfp.mongodb.net/?retryWrites=true&w=majority'
const connection = "mongodb+srv://doadmin:94B6u27tbJX1P83Q@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=chatty-db"

mongoose.connect(connection);
mongoose.connection.on('error', () => {
  console.log('Connection issue with mongoDB :(');
});

app.use(express.static('public_html'))
app.use(express.json())

const port = 80;
app.listen(port, () => { console.log('server has started'); });

var Users = new mongoose.Schema( {
  username: String,
  password: String,
  // listings: 
  // purchases: 
});

var User = mongoose.model('User', Users);

let myNewUser = new User({
  username: "juliajuliajulia",
  password: "123456"
});

let happened = myNewUser.save();
p.then(() => {
  res.end('CREATED SUCCESSFULLY');
});
p.catch(() => {
  res.end("no save :(")
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

app.get('/get/users/', (req, res) => {
  console.log("HELLO?!?!?!");
  alert("hello hello");
    let all = User.find({}).exec();
    all.then((results) => { 
      res.end(JSON.stringify(results));
    });
    all.catch((error) => {
      console.log(error);
      res.end('NO GOOD.');
    });
});

// app.post('/get/users/', (req, res) => {
//   console.log("HELLLOOOO (#2??!?!)?!?!?!");
//   alert("IT'S ME!!!!");
//     let all = User.find({}).exec();
//     all.then((results) => { 
//       res.end(JSON.stringify(results));
//     });
//     all.catch((error) => {
//       console.log(error);
//       res.end('NO GOOD.');
//     });
// });

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
  let usr_name = req.body.username;
  let pass = req.body.password;
  console.log("body: " + body);
  console.log("username (usr_name): " + usr_name);
  console.log("password (pass): " + pass);
  
  // var newUser = new User(userToBeSaved);

  var newUser = new User({
    'username': usr_name
    'password': pass
});
  let newUsr = newUser.save();
  newUsr.then( (doc) => { 
    res.end('SAVED SUCCESFULLY');
  });
  newUsr.catch( (err) => { 
    console.log("COULD NOT CREATE USER!!!");
    res.end("COULD NOT CREATE USER!!!");
  });
});



app.post('/add/user/:usrnam/:psswrd', (req, res) => {
  // let userToBeSaved = req.params.usrnam;
  let usr_name = req.params.usrnam;
  let pass = req.body.psswrd;
  // console.log("body: " + body);
  console.log("username (usr_name): " + usr_name);
  console.log("password (pass): " + pass);
  // var newUser = new User(userToBeSaved);

  var newUser = new User({
    'username': usr_name
    'password': pass
});
  let newUsr = newUser.save();
  newUsr.then( (doc) => { 
    res.end('SAVED SUCCESFULLY');
  });
  newUsr.catch( (err) => { 
    console.log("COULD NOT CREATE USER!!!");
    res.end("COULD NOT CREATE USER!!!");
  });
});



