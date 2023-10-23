const { MongoClient } = require('mongodb');
const express = require('express');
const { use } = require('express/lib/application');
const fs = require('fs');
const mongoose = require('mongoose');
const readline = require("readline");

// 146.190.13.110
const app = express();
const port = 3000;
app.use(express.static('./public_html'));
app.listen(port, () => console.log('Chatty server listening on port: ' + port));

const db  = mongoose.connection;

const mongoDBURL = 'mongodb+srv://doadmin:94B6u27tbJX1P83Q@chatty-db-2b2a9a25.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=chatty-db'
//94B6u27tbJX1P83Q
mongoose.connect(mongoDBURL, { useNewUrlParser: true });

db.on('error', () => { console.log('MongoDB connection error:') });

var Messages = new mongoose.Schema({
    alias: String,
    message: String
  }, {timestamps: true});    

var msg = db.model("Msg", Messages)

let test = new msg({alias:"kjnkjn", message:"ghgvhgvhgvhg"});
console.log("test message added.");


app.get('/chats', function (req, res) {
    let all = Messages.find({}).exec();
    all.then((docs, res) => {
        processDisplay(docs, res);
    })

});

app.post('/chats/post', function (req, res) {
    let newAlias = req.body.alias      // "alias"
    let newMessage = req.body.message  // "message"
    console.log("given alias: " + newAlias + " and message: '" + newMessage + "'. ");

    let newMsg = new msg({alias: newAlias, message: newMessage});
    test.save().then((newGuy) => {
        console.log("sender: " + newGuy.alias);
        console.log("message: " + newGuy.message);
        console.log("created at: " + newGuy.createdAt);
        console.log("...has now been saved.");
    }) 
});


console.log("HERE!")
test.save().then((huh) => {
    console.log("sender: " + huh.sender);
    console.log("message: " + huh.message);
    console.log("Created at: " + huh.createdAt);

}) 



function processDisplay(docs, res){
    let output = "\n";
    for (let i=0; i < docs.length; i++){
        /*
        <div class="one-message-container">
          <div class="alias-display-text">Person #1: </div>
          <div class="message-display-text">Hello, who is this?</div>
          <div class="timestamp-text">(August 16, 2029 at 1:55:03pm)</div>
        </div>  <!-- "one-message-container" -->
          */
        enddiv = "</div>\n";
        output += "<div class='one-message-container'>\n";
        output += "<div class='alias-display-text'>\n";
        output += docs[i].alias + enddiv;
        output += "<div class='message-display-text'>"
        output += docs[i].message + enddiv;
        // (timestamp WOULD go here)
        output += enddiv;
    }
    console.log("output to be returned to display messages: \n" + output);
    res.end(output);
}


