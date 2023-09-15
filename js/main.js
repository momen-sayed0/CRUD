let title = document.querySelector("#title");
let allCost = document.querySelectorAll("#allCost input");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let createBtn = document.querySelector(".btn");
let tbody = document.querySelector("#tbody");
let clearAllBtn = document.querySelector("#clearAllBtn");
let countBtn = document.querySelector("#countBtn");
let divLight = document.querySelector(".dark");
let icon = document.querySelector("i");
let invalid_span = document.querySelector(".invalid_span");
let allInputs = document.querySelectorAll("input");
let span = document.querySelectorAll("span");
let products;
let mood = "create";
let globalID;
// change theme color
let changeTheme = () => {
     if (divLight.classList.contains("dark")) {
          icon.classList.replace("fa-sun", "fa-moon");
          divLight.classList.replace("dark", "light");
     } else {
          divLight.classList.replace("light", "dark");
          icon.classList.replace("fa-moon", "fa-sun");
     }
}

icon.addEventListener('click', changeTheme);

if (localStorage.products != null) {
     products = JSON.parse(localStorage.products);
} else {
     products = [];
}

// validation error for inputs with invalid value
let validationError = false;

for (let i = 0; i < allInputs.length; i++) {
     if (allInputs[i].value === '') {
          validationError = false;
     } else{
          validationError = true;
     }

     allInputs[i].addEventListener("keyup", () => {
          if (allInputs[i].value === '') {
               allInputs[i].classList.add("invalid");
               span[i].classList.remove("invalid_span");
               validationError = false;

          } else {
               validationError = true;
               allInputs[i].classList.remove("invalid");
               span[i].classList.add("invalid_span");
          }
     
     });
}

// Calculate the total cost
let getTotalCost = () => {
     price = allCost[0].value;
     tax = allCost[1].value;
     discount = allCost[2].value;
     let taxCost = +price * (+tax / 100);
     total = (+taxCost + +price) - +discount;
     allCost[3].value = Math.ceil(total);
}
for (let i = 0; i < allCost.length; i++) {
     allCost[i].addEventListener("keyup", getTotalCost);
}
// createObject
let createObject = () => {
     let newProductObject = {
          title: title.value,
          price: allCost[0].value,
          tax: allCost[1].value,
          discount: allCost[2].value,
          total: allCost[3].value,
          count: count.value,
          category: category.value
     }

     if (validationError == true) {
          if (mood === 'create') {
               if (count.value > 1) {
                    for (let i = 0; i < count.value; i++) {
                         products.push(newProductObject);
                    }
               } else {
                    products.push(newProductObject);
               }
          } else {
               products[globalID] = newProductObject;
               mood = 'create';
               createBtn.classList.replace('btn-update', 'btn');
               createBtn.innerHTML = "Add new product";
               count.classList.remove('none');
          }
          console.log(products);
          clearInputs();
          renderData();
          localStorage.setItem("products", JSON.stringify(products));
     }
}

//clearInputs
let clearInputs = () => {
     title.value = '';
     allCost[0].value = '';
     allCost[1].value = '';
     allCost[2].value = '';
     allCost[3].value = '';
     count.value = '';
     category.value = '';
}
// renderData
let renderData = () => {
     let table = '';
     for (let i = 0; i < products.length; i++) {
          table += `
     <tr>
          <td data-label='ID'>${i +1}</td>
          <td data-label='Title'>${products[i].title}</td>
          <td data-label='Price'>${products[i].price}</td>
          <td data-label='Tax %'>${products[i].tax}</td>
          <td data-label='Discount'>${products[i].discount}</td>
          <td data-label='Total'>${products[i].total}</td>
          <td data-label='Category'>${products[i].category}</td>
          <td data-label='Edit'> <a onclick ='updateProduct (${i})'> <i class="fa-solid fa-pen-to-square"></i> </a> </td>
          <td data-label='Delete'> <a onclick='deleteProduct(${i})' > <i class="fa-solid fa-trash"></i> </a> </td>
     </tr>`
     }
     tbody.innerHTML = table;
     if (products.length == 0) {
          clearAllBtn.style.display = 'none';
     } else {
          clearAllBtn.style.display = 'block';
          countBtn.innerHTML = products.length;
     }
}

renderData();

let updateProduct = (i) => {
     mood = "update";
     globalID = i;
     title.value = products[i].title;
     allCost[0].value = products[i].price;
     allCost[1].value = products[i].tax;
     allCost[2].value = products[i].discount;
     allCost[3].value = products[i].total;
     category.value = products[i].category;
     count.classList.add('none');
     createBtn.innerHTML = `Update This Product : ${i +1}`
     createBtn.classList.replace('btn', 'btn-update');
}

let deleteProduct = (i) => {
     products.splice(i, 1);
     localStorage.products = JSON.stringify(products);
     renderData();


}
let clearAll = () => {
     localStorage.clear();
     products.splice(0);
     renderData();
}

// check if price is positive number
function checkNumber(value){
     if (value <= 0){
          createBtn.style.display = 'none';
     }else{
          createBtn.style.display = 'block';
     }

}

createBtn.addEventListener("click", createObject);
clearAllBtn.addEventListener("click", clearAll);


// createBtn.addEventListener("keyup", (event) => {
//      if (event.key == "Enter") {
//           renderData ();
//           }
// });