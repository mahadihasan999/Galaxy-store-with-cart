// fetch url api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="">
    <div class="single-product bg-light h-50">
      <div>
          <img class="product-image" src=${product.image}></img>
      </div>
      <h4 >${product.title.slice(0, 14)}</h4>
      <p>Category:${product.category}</p>
      <p> <i class="fas fa-star filled"></i> Rating: ${product.rating.rate} (${product.rating.count})</p>
      <h4 class="text-danger">Price: $ ${product.price}</h4>

       <button onclick="addToCart(${product.id},${product.price})" class="btn" id="addToCart-btn">Add to cart</button> 

       <button onclick="loadStoreDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button> 

      </div>
      </div>
      `;
    //append in div
    document.getElementById("all-products").appendChild(div);
  }
};

//Show detail  as a single product in UI
const loadStoreDetails = storeId => {
  console.log(storeId);
  const url = `https://fakestoreapi.com/products/${storeId}`;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => displayStoreDetail(data))
}

const displayStoreDetail = store => {
  const storeDetails = document.getElementById('product-detail');
  storeDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  console.log(store);
  div.innerHTML = `
  <div class="detail-store">
  <div class="p-2 ">
      <h5 class="text-danger">Details: ${store.title.slice(0, 25)}</h5>
      <p>${store.description.slice(0, 100)}</p>
  </div>
  
</div>`;
  storeDetails.appendChild(div);
}

//Product count
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  displayStoreDetail('none')

};

// set innerText in id
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  // toFixed 2 decimal number
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

