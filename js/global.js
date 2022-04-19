
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
const subTotalElement = document.getElementById("sub-total");
const mainTotalElement = document.getElementById("main-total");
const shippingPriceElement = document.getElementById("shipping-fee");
if (bar) {
  bar.addEventListener("click", () => nav.classList.add("active"))
}
if (close) {
  close.addEventListener("click", () =>nav.classList.remove("active"))
}
async function readyDetails() {
  const data = await (await fetch("./json/products.json")).json();
  return data.products;
}
async function readyGallery() {
  const data = await (await fetch("./json/ImgGallery.json")).json();
  return data.gallery;
}
async function filteredProduct(src){
  const lastText = src.slice(35, -1);
  const products = await readyDetails();
  return products.filter(item => item.img.slice(15, -1) == lastText)[0];
}
function getSingleProFromLS() {
  const singleProItem = JSON.parse(localStorage.getItem("singleProItem"));
  return singleProItem === null ? item : singleProItem;
}
function getMultipleProItems() {
  return JSON.parse(localStorage.getItem("multipleProItems") || "[]");
}
function addMultipleProItems(proItem) {
  const productStorage = getMultipleProItems()
  productStorage.push(proItem);
  const uniq = new Set(productStorage.map(v => v.id))
  
  if (uniq.size < productStorage.length) {return}
  else { localStorage.setItem("multipleProItems", JSON.stringify(productStorage));
  }
}
function removeProductFromLS(id) {
  let productStorage = getMultipleProItems();
  productStorage = productStorage.filter(item => item.id != id)
  localStorage.setItem("multipleProItems", JSON.stringify(productStorage))
}

const item = {id: 4, img: "./img/products/f3.jpg", name: "Brown Flowered Vintage", price: 45}

async function provideObject(item) {
  const lastText = item.slice(15, -1);
  const products = await readyDetails();
  return products.filter(item => item.img.slice(15, -1) == lastText)[0];
}
function stars(num) {
  let star = ""
  for (let i=0; i< num-1; i++) {
    star += `<i class="bx bxs-star"></i>`;
  }
  star += `<i class="bx bxs-star-half"></i>`;
  return star;
}
function updateTotal(e) {
  let total = 0;
  const cartRows = document.querySelectorAll(".cart-row");
  for (let i = 0; i < cartRows.length; i++) {
    const cartPriceElement = cartRows[i].querySelector(".cart-price").innerText;
    const quantity = cartRows[i].querySelector(".cart-quantity").value;
    let priceTotal = cartRows[i].querySelector(".price-total");
    const price = parseFloat(cartPriceElement.replace("$", ""));
    priceTotal.innerText = "$" + (price * quantity);
    total += (price * quantity);
  }
  
  total = total.toFixed(2);
  document.querySelector(".total").innerText = `$${total}`;
  subTotalElement.innerText = `$${total}`;
  mainTotalElement.innerText = `$${total}`;
  CartTotal();
}

function CartTotal() {
  let TotalText = subTotalElement.innerText;
  let ShippingText = shippingPriceElement.innerText;
  TotalText = parseFloat(TotalText.replace("$", ""))
  ShippingText = parseFloat(ShippingText.replace("$", ""));
  mainTotalElement.innerText = `$${TotalText + ShippingText}`;
}