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

// localStorage
if (localStorage.products != null) {
     products = JSON.parse(localStorage.products);
} else {
     products = [];
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

// clearInputs after input data
let clearInputs = () => {
     title.value = '';
     allCost[0].value = '';
     allCost[1].value = '';
     allCost[2].value = '';
     allCost[3].value = '';
     count.value = '';
     category.value = '';
}

// delete all products
let clearAll = () => {
     localStorage.clear();
     products.splice(0);
     renderData();
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

//  Edit product
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


//  delete one product
let deleteProduct = (i) => {
     products.splice(i, 1);
     localStorage.products = JSON.stringify(products);
     renderData();
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

     if (allInputs[0].value == "" && allInputs[1].value == "" && allInputs[2].value == "" && allInputs[3].value == "" && allInputs[5].value == "" && allInputs[6].value == "") {
          allInputs[0].classList.add("invalid");
          allInputs[1].classList.add("invalid");
          allInputs[2].classList.add("invalid");
          allInputs[3].classList.add("invalid");
          allInputs[5].classList.add("invalid");
          allInputs[6].classList.add("invalid");
     } else if (allInputs[0].value == "") {
          allInputs[0].classList.add("invalid");
          alert("Please enter valid product name");
     } else if (allInputs[1].value == "") {
          allInputs[1].classList.add("invalid");
          alert("Please enter valid price number");
     } else if (allInputs[2].value == "") {
          allInputs[2].classList.add("invalid");
          alert("Please enter valid tax number");
     } else if (allInputs[3].value == "") {
          allInputs[3].classList.add("invalid");
          alert("Please enter valid discount number");
     } else if (allInputs[5].value == "") {
          allInputs[5].classList.add("invalid");
          alert("Please enter valid number at least 1");
     } else if (allInputs[6].value == "") {
          allInputs[6].classList.add("invalid");
          alert("Please enter valid category name");
     } else {
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
}


let validationError = false;
//  Check if all inputs aren't empty string
for (let i = 0; i < allInputs.length; i++) {
     if (allInputs[i].value === '') {
          validationError = false;
     } else {
          validationError = true;
     }

     allInputs[i].addEventListener("keyup", () => {
          if (allInputs[i].value === '' || allInputs[i].value <= 0) {
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

// Check if title isn't number
allInputs[0].addEventListener("keyup", () => {
     if (title.value >= 0) {
          allInputs[0].classList.add("invalid");
          span[0].classList.remove("invalid_span");
          validationError = false;
     }
});
// Check if category isn't number
allInputs[6].addEventListener("keyup", () => {
     if (category.value >= 0) {
          allInputs[6].classList.add("invalid");
          span[6].classList.remove("invalid_span");
          validationError = false;
     }
});

// createBtn.addEventListener("click", () => {
if (allInputs.value === '') {
     // validationError = false;
     alert('Please enter a');
}
// });


createBtn.addEventListener("click", createObject);
clearAllBtn.addEventListener("click", clearAll);

for (let i = 0; i < allInputs.length; i++) {
allInputs[i].addEventListener('keyup', (event) => {
     if (event.key === "Enter") {
          createObject();
     }
});
};
