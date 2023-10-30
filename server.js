const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const crypto = require('crypto');

const connection_string = 'mongodb+srv://doadmin:94B6u27tbJX1P83Q@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=chatty-db';

mongoose.connect(connection_string);
mongoose.connection.on('error', () => {
  console.log('There was a problem connecting to mongoDB');
});

/**
 * Specify the schema for the database, including items and categories.
 */
var ItemSchema = new mongoose.Schema( {
    name: String,
    difficulty: Number,
    stat: String,
    category: String
});
var Item = mongoose.model('Item', ItemSchema);
var CategorySchema = new mongoose.Schema( {
  name: String,
  priority: Number,
  color: String
});
var Category = mongoose.model('Category', CategorySchema);

/**
 * Initialize the express app and configure with various features 
 * such as JSON parsing, static file serving, etc.
 */
const app = express();
app.use(cookieParser());    
app.use(express.static('public_html'))
//app.get('/', (req, res) => { res.redirect('/app/index.html'); });
app.use(express.json())
//app.use(parser.text({type: '*/*'}));

/**
 * Get all of the items that correspond with a particular catagory.
 * The category is specified as a part of the URL after /items/.
 */
app.get('/items/:cat', (req, res) => {
    let cat = req.params.cat;
    let p1 = Item.find({category: cat}).exec();
    p1.then( (results) => { 
      res.end( JSON.stringify(results) );
    });
    p1.catch( (error) => {
      console.log(error);
      res.end('FAIL');
    });
});

app.get('/testing', (req, res, next) => {
  console.log('A');
  next();
});

app.get('/testing', (req, res, next) => {
  console.log('B');
  next();
});

app.get('/testing', (req, res) => {
  console.log('C');
  res.end('hi')
});


/**
 * This route is for creating a new item for a particular category. 
 * The category that the items belongs to is stored as a part of the item object in the database.
 */
app.post('/create/item/', (req, res) => {
  let newItemToSave = req.body;
  var newItem = new Item(newItemToSave);
  let p1 = newItem.save();
  p1.then( (doc) => { 
    res.end('SAVED SUCCESFULLY');
  });
  p1.catch( (err) => { 
    console.log(err);
    res.end('FAIL');
  });
});

/**
 * This route is for creating a new list category.
 */
app.post('/create/category/', (req, res) => {
  let CategoryToSave = req.body;
  var newCategory = new Category(CategoryToSave);
  let p1 = newCategory.save();
  p1.then( (doc) => { 
    res.end('SAVED SUCCESFULLY');
  });
  p1.catch( (err) => { 
    console.log(err);
    res.end('FAILED TO CREATE A CATEGORY');
  });
});

/**
 * This route is for fetching all of the categories stored in the database.
 */
app.get('/categories/', (req, res) => {
    let p1 = Category.find({}).exec();
    p1.then( (results) => { 
      res.end( JSON.stringify(results) );
    });
    p1.catch( (error) => {
      console.log(error);
      res.end('FAIL');
    });
});

// Start up the server to listen on port 80
const port = 80;
app.listen(port, () => { console.log('server has started'); });

