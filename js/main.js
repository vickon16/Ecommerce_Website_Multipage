
document.addEventListener("DOMContentLoaded", displayProducts);

async function showProSection(query, start, end) {
  const products = await readyDetails();
  if (document.querySelector(query)) {
    const proContainer = document.querySelector(query);
    let item = "";
    for (let i=start; i < products.length-end; i++) {
    item += `
    <div class="pro" data-id="${products[i].id}">
    <img src="${products[i].img}" class="img" alt="">
    <div class="des">
      <span>Adidas</span>
      <h5>${products[i].name}</h5>
      <div class="star">
        ${stars(products[i].star)}
      </div>
      <h4>$${products[i].price}</h4>
    </div>
    <a href="#" class="cart-button"><i class="bx bx-cart cart"></i></a>
    </div>
    `;
  }
    proContainer.innerHTML = item;

    const productBox = document.querySelectorAll(".pro .img");
    const cartButton = document.querySelectorAll(".cart-button");
    for (let i = 0; i < productBox.length; i++) {
      productBox[i].addEventListener("click", clickedProductBox);
      cartButton[i].addEventListener("click", clickedCartButton);
    }
  }
}

async function clickedProductBox(e) {
  const src = e.target.src;
  const filtered = await filteredProduct(src);
  localStorage.setItem("singleProItem", JSON.stringify(filtered));
  window.location.href = "sproduct.html";
}

async function clickedCartButton(e) {
  const button = e.target;
  const img = button.parentElement.parentElement.firstElementChild;
  const filtered = await filteredProduct(img.src);
  addMultipleProItems(filtered);
  window.location.href = "cart.html";
}

async function displayProducts() {
  showProSection(".products.one .pro-container", 0, 12);
  showProSection(".products.two .pro-container", 12, 0);
  showProSection(".products.all .pro-container", 0, 0);
}




