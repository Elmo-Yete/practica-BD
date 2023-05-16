let id = 1;
const createTableData = (text) => {
  let tableData = document.createElement("td");
  let dataText = document.createTextNode(text);
  tableData.appendChild(dataText);
  return tableData;
};
const createButtonDelete = (keyProduct) => {
  let buttonDelete = document.createElement("td");
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Delete");
  button.appendChild(buttonText);
  button.classList.add("btn", "btn-danger");
  button.setAttribute("type", "button");
  button.setAttribute("type", "submit");
  button.setAttribute("onclick", `deleteProducts("${keyProduct}")`);
  buttonDelete.appendChild(button);
  return buttonDelete;
};
const createButtonUpdate = () => {
  let buttonUpdate = document.createElement("td");
  let button = document.createElement("button");
  let buttonText = document.createTextNode("Is comming...");
  button.classList.add("btn", "btn-warning");
  button.setAttribute("type", "button");
  button.appendChild(buttonText);
  buttonUpdate.appendChild(button);
  return buttonUpdate;
};
const createTableRow = (key, product) => {
  let row = document.createElement("tr");
  let tableRowHead = document.createElement("th");
  tableRowHead.setAttribute("scope", "row");
  let rowNumber = document.createTextNode(id);
  tableRowHead.append(rowNumber);
  let productName = createTableData(product.name);
  let productDesc = createTableData(product.description);
  let productPrice = createTableData(`$ ${product.price}`);
  let deleteButton = createButtonDelete(key);
  let updateButton = createButtonUpdate();
  row.append(
    tableRowHead,
    productName,
    productDesc,
    productPrice,
    deleteButton,
    updateButton
  );
  id += 1;
  return row;
};

const printRowOntable = (key, product) => {
  let table = document.getElementById("productsTable");
  let newRow = createTableRow(key, product);
  if (!product.availability) {
  console.log(product.availability);
    newRow.classList.add("table-secondary");
  }
  table.appendChild(newRow);
  return;
};
const getProductInformation = () => {
  let nameInput = document.getElementById("productName");
  let name = nameInput.value;
  let descriptionInput = document.getElementById("productDescription");
  let description = descriptionInput.value;
  let priceInput = document.getElementById("productPrice");
  let price = priceInput.value;
  let availabilityeCheck = document.getElementById("disabledFieldsetCheck");
  let availability = availabilityeCheck.checked;
  let product = {
    name: name,
    description: description,
    price: price,
    availability: availability,
  };
  console.log(product);
  return product;
};

const addProdutButton = async () => {
  event.preventDefault();
  deleteListProcducts();
  let newProduct = getProductInformation();
  let pushToBD = await fetch(
    `https://products-db-e6ed7-default-rtdb.firebaseio.com/products/.json`,
    {
      method: "POST",
      body: JSON.stringify(newProduct),
    }
  );
  let data = await pushToBD.json();
  printProducts();
  deleteInfoInputs();
  return data;
};

let printProducts = async () => {
  let products = await getProducts();
  for (key in products) {
    printRowOntable(key, products[key]);
  }
};
let deleteListProcducts = () => {
  let list = document.getElementById("productsTable");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  return (id = 1);
};
let deleteInfoInputs = () => {
  let nameInput = document.getElementById("productName");
  nameInput.value = "";
  let descriptionInput = document.getElementById("productDescription");
  descriptionInput.value = "";
  let priceInput = document.getElementById("productPrice");
  priceInput.value = "";
  let availabilityeCheck = document.getElementById("disabledFieldsetCheck");
  availabilityeCheck.checked = false;
  return;
};
const getProducts = async () => {
  let response = await fetch(
    `https://products-db-e6ed7-default-rtdb.firebaseio.com/products/.json`
  );
  let productsObj = await response.json();
  return productsObj;
};

const deleteProducts = async (keyProduct) => {
  let response = await fetch(
    `https://products-db-e6ed7-default-rtdb.firebaseio.com/products/${keyProduct}/.json`,
    {
      method: "DELETE",
    }
  );
  let data = await response.json();
  deleteListProcducts();
  printProducts();
  return data;
};
printProducts();
