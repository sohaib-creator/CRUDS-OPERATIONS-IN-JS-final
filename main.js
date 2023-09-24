let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catogary = document.getElementById("catogary");
let btncreate = document.getElementById("btncreate");
let searchtxt = document.getElementById("searchinp");
let btnbytitle = document.getElementById("btn-by-title");
let btnbycatogary = document.getElementById("btn-by-catogary");
let deleteall = document.getElementById("deleteall");
let datapro = [];
let mood = "create";
let tmp;
let searchMood = "title";

if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = []; // if there is no data in local storage then set it to empty array []
}

function GetTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#090";
  }
}

btncreate.onclick = function () {
  if (title.value != "" && price.value != "" && catogary.value != "") {
    let newpro = {
      title: title.value.toLowerCase(),
      price: +price.value,
      tax: +tax.value,
      ads: +ads.value,
      discount: +discount.value,
      total: +total.innerHTML,
      count: +count.value,
      catogary: catogary.value.toLowerCase(),
    };

    if (mood === "create") {
      if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
    }
    clearDataInp();
    localStorage.product = JSON.stringify(datapro);
    btncreate.innerHTML = "Create";
    count.style.display = "block";
    ShowData();
  }
};

///////////////////////////////////// Show Data /////////////////////////////////////
function ShowData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title.toLowerCase()}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].tax}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td> ${datapro[i].catogary.toLowerCase()} </td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="DeleteData(${i})" id="delete">delete</button></td>
        </tr>
    `;
  }
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;

  if (datapro.length > 0) {
    deleteall.innerHTML = `
  <button onclick="deleteAll()" >Delete All ( ${datapro.length} )</button>
  `;
  } else {
    deleteall.style.display = " ";
  }
}
ShowData();

///////////////////////////////////// Clear Data in input /////////////////////////////////////
function clearDataInp() {
  title.value = "";
  price.value = "";
  ads.value = "";
  tax.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catogary.value = "";
  GetTotal();
  total.style.background = "#900";
}
///////////////////////////////////// Clear Data in input /////////////////////////////////////

///////////////////////////////////// Delete Data /////////////////////////////////////
function DeleteData(ind) {
  datapro.splice(ind, 1);
  localStorage.product = JSON.stringify(datapro);
  ShowData();
}

///////////////////////////////////// Delete All /////////////////////////////////////

// if (datapro.length > 0) {
//   deleteall.innerHTML = `
//   <button onclick="deleteAll()" >Delete All ( ${datapro.length} )</button>
//   `;
// }

function deleteAll() {
  localStorage.clear("product");
  datapro.splice(0);
  ShowData();

  if (datapro.length == 0) {
    deleteall.innerHTML = ``;
  }
}
///////////////////////////////////// Delete All /////////////////////////////////////

///////////////////////////////////// Update  /////////////////////////////////////

function updateData(ind) {
  count.style.display = "none";
  title.value = datapro[ind].title;
  price.value = datapro[ind].price;
  tax.value = datapro[ind].tax;
  ads.value = datapro[ind].ads;
  catogary.value = datapro[ind].catogary;
  GetTotal();
  mood = "update";
  btncreate.innerHTML = "Update";
  tmp = ind;
}
///////////////////////////////////// Update  /////////////////////////////////////

///////////////////////////////////// Search  /////////////////////////////////////

function GetSearchMood(id) {
  if (id === "btn-by-title") {
    searchMood = "title";
    searchtxt.placeholder = "search by title";
  } else {
    searchMood = "catogary";
    searchtxt.placeholder = "search by catogary";
  }
}
function searchData(values) {
  let table = "";

  for (let i = 0; i < datapro.length; i++) {
    if (searchMood === "title") {
      if (datapro[i].title.toLowerCase().includes(values.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].tax}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].catogary}</td>
          <td><button onclick="updateDate(${i})" id="update">update</button></td>
          <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
      }
    }
    if (searchMood == "catogary") {
      if (datapro[i].catogary.toLowerCase().includes(values.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].tax}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td> ${datapro[i].catogary} </td>
          <td><button onclick="updateDate(${i})" id="update">update</button></td>
          <td><button onclick="DeleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
      }
    }
  }
  tbody.innerHTML = table;
}
///////////////////////////////////// Search  /////////////////////////////////////
