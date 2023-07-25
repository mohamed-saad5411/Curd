
var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productList;
var addProductBtn = document.getElementById("addProductBtn");
var UpdateProductBtn = document.getElementById("UpdateProductBtn");

if (localStorage.getItem(("productList")) == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("productList"))
    displayProduct(productList);
}


function addProduct() {
    if (validateProductName()==true,validateProductPrice()==true,validateproductCategory()==true){
        var product = {
            name: ProductName.value,
            price: ProductPrice.value,
            categury: productCategory.value,
            description: productDesc.value,
        }
        productList.push(product);
        displayProduct(productList);
        localStorage.setItem("productList", JSON.stringify(productList))
        // clearForm();
    }else{
        alert("invalied product name")
    }
}


function displayProduct(list) {
    var cartona = ``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].newName ? list[i].newName : list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].categury}</td>
        <td>${list[i].description}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
    </tr>`
    }
    document.getElementById("tbody").innerHTML = cartona;
}

function deleteProduct(currentProduct) {
    productList.splice(currentProduct, 1)
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProduct(productList)
}

function clearForm() {
    ProductName.value = "",
        ProductPrice.value = "",
        productCategory.value = "",
        productDesc.value = ""
}

function searchProduct(inputTerm) {
    var searchContainer = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(inputTerm.toLowerCase()) == true) {
            productList[i].newName=productList[i].name.replace(inputTerm,`<span class="text-danger fw-bold">${inputTerm}</span>`)
            searchContainer.push(productList[i])
            displayProduct(searchContainer)
        }
    }
}

function updateProduct(index) {
    addProductBtn.classList.add("d-none")
    UpdateProductBtn.classList.replace("d-none", "d-block")
    ProductName.value = productList[index].name;
    ProductPrice.value = productList[index].price;
    productCategory.value = productList[index].categury;
    productDesc.value = productList[index].description;
};

function updatedProduct() {
    addProductBtn.classList.replace("d-none", "d-block");
    UpdateProductBtn.classList.replace("d-block", "d-none");



    // clearForm()
}

function validateProductName(){
    var regex= /^[A-Z][a-z]{3,10}$/;
    if (regex.test(ProductName.value)==true){
        ProductName.style.border="none"
        return true;
    }else{
        ProductName.style.border="2px solid red"
        return false;
    }
}

function validateProductPrice(){
    var regex= /^([1-9][0-9][0-9][0-9]|10000)$/;
    if (regex.test(ProductPrice.value)==true){
        ProductPrice.style.border="none"
        return true;
    }else{
        ProductPrice.style.border="2px solid red"
        return false;
    }
}

function validateproductCategory(){
    var regex= /^(tv|mobile)$/;
    if (regex.test(productCategory.value.toLowerCase())==true){
        productCategory.style.border="none"
        return true;
    }else{
        productCategory.style.border="2px solid red"
        return false;
    }
}
// function validateproductDesc(){
//     var regex= /^([1-9][0-9][0-9][0-9]|10000)$/;
//     if (regex.test(ProductPrice.value)==true){
//         ProductPrice.style.border="none"
//         return true;
//     }else{
//         ProductPrice.style.border="2px solid red"
//         return false;
//     }
// }