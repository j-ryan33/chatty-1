/*
Author:  Julia Ryan
Course:  CSC337 (FA23, Ben)
Project: PA9 - Ostaa
File:    oosta_functions.js

Creates the JavaScript that will be used in
the vaious pages within public_html directory.
*/

function createUser(){
    let usr = document.getElementById('usrName').value;
    let pass = document.getElementById('password').value;
    let p = fetch('/add/user/' + usr + "/" + pass);
    p.then((response) =>{
      return response.text();
    }).then((text) => {
      alert(text);
    });
}
  
  
  function getUsers() {
      let url = '/get/users';
    let p = fetch(url);
    let rp = p.then( (response) => {
      return response.json();
    }).then((objects) => { 
      let html = '';
      for (i in objects) {
        html += '<div>' + objects[i] + '</div>\n'
      }
      let bHTML = document.getElementById('bodyContain');
      bHTML.innerHTML = html;
    }).catch(() => { 
      alert('something went wrong');
    });
  }


//function createItem() {
  
//}

//////////// from home.html: //////////////

function searchListingsClick(){
  // get cur value in the txt input(ID: searchText)
}

function createListingsClick(){
  // get all of the values that are in the user's purchases
  // then make them the inner-html in right-hand column
}

function viewPurchasesClick() {
  // same as listings, but purchases list instead
}


//////////// from post.html: //////////////

function createPostButton(){
  // Do other operations to store the info in database
  // also redirect to home page again!

  /*
  used a mongo dropolet instread of web app!!!!!
  */
}

