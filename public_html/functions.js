
selectedCat = 'Work';

function getCategories() {
  let url = '/categories/';
  let p = fetch(url);
  let ps = p.then( (response) => {
    return response.json();
  }).then((objects) => { 
    let html = '';
    for (i in objects) {
      html += '<div onclick="getItemsForCategory(\'' + objects[i].name + '\')" style="cursor:pointer;color:' + objects[i].color + '">' + objects[i].name + '</div>\n'
    }
    let x = document.getElementById('categories');
    x.innerHTML = html;
  }).catch(() => { 
    alert('something went wrong');
  });
}

function getItemsForCategory(cat) {
  selectedCat = cat;
  let url = '/items/' + cat;
  let p = fetch(url);
  let ps = p.then( (response) => {
    return response.json();
  }).then((objects) => { 
    let html = '';
    for (i in objects) {
      html += '<div>' + objects[i].name + ' - ' + objects[i].stat + '</div>\n'
    }
    let x = document.getElementById('items');
    x.innerHTML = html;
  }).catch(() => { 
    alert('something went wrong');
  });
}

function createCategory() {
  let n = document.getElementById('catName').value;
  let pr = document.getElementById('catPrio').value;
  let c = document.getElementById('catColor').value;
  let url = '/create/category/';
  let data = { name: n, priority: pr, color: c};
  let p = fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  });
  p.then(() => {
    console.log('Category Created');
    getCategories();
  });
  p.catch(() => { 
    alert('something went wrong');
  });
}

function createItem() {
  let n = document.getElementById('itemName').value;
  let s = document.getElementById('itemStat').value;
  let d = document.getElementById('itemDifficulty').value;
  let url = '/create/item/';
  let data = { name: n, stat: s, difficulty: d, category: selectedCat};
  let p = fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  });
  p.then(() => { 
    getItemsForCategory(selectedCat);
  });
  p.catch(() => { 
    alert('something went wrong');
  });
}

