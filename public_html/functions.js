const { text } = require("express");


function logmexoxo(){
    console.log("julia!!!!!!!!!!!!! :D");
}




function displayNewMessage(name, message){
    /*
    Parameters:    
        -  name (string): who sent the message
        -  message (string): message content
    */
   console.log("#0!");
    const displaytxt = document.getElementById("conversation-text-container");
    console.log("#1!");
    
    const msgContainerElement = document.createElement("one-message-container");
    console.log("#2!");
    const nameElement = document.createElement("alias-display-text");
    console.log("#3!");
    nameElement.innerHTML = name + ": ";
    console.log("#4!");
    const messageElement = document.createElement("message-display-text");
    messageElement.innerHTML = message;
    console.log("#5!");
    msgContainerElement.appendChild(nameElement);
    msgContainerElement.appendChild(messageElement);
    console.log("#6!");

    displaytxt.appendChild(msgContainerElement);
    console.log("#7!");


    // 
}

displayNewMessage("Julia", "Hello, who is THIS?");


function allMessages(){
    let url = "http://localhost/chats"
    fetch(url).then((response) => {
        return response.text();
    }).then((text) => {
        document.getElementById("conversation-text-container").innerHTML = text;
    }).catch((error) => {
        console.log("ERROR: " + error);
    });
}

function newMessage(){
    var newAlias = document.getElementById("alias-in").value;
    var newMessage = document.getElementById("message-in").value;
    let url = "http://localhost/chats/post";
    fetch("/chats/post" + new URLSearchParams ({
        alias: newAlias,
        message: newMessage
    }))
    

    
    

}