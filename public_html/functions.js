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

