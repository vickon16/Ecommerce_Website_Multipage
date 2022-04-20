
document.addEventListener("DOMContentLoaded", async () => {
  const product = getSingleProFromLS();
  const galleryData = await readyGallery();
  const gallery = galleryData[product.id][product.id];
  display(product, gallery);
});

async function display(product, gallery) {
  const proDetails = document.getElementById("pro-details");
  const gallery0 = await filteredProduct(gallery[0])
  const gallery1 = await filteredProduct(gallery[1])
  const gallery2 = await filteredProduct(gallery[2])
  const gallery3 = await filteredProduct(gallery[3])
  
  let details = `<div class="single-pro-img">
  <img src="${product.img}" id="mainImg" class="img" alt="">
  <div class="small-img-group">
    <div class="small-img-col">
      <img src="${gallery0.img}" class="img subImg" alt="">
      <div class="label"><p>${gallery0.name}</p><h6>$${gallery0.price}</h6></div>
    </div>
    <div class="small-img-col">
      <img src="${gallery1.img}" class="img subImg" alt="">
      <div class="label"><p>${gallery1.name}</p><h6>$${gallery1.price}</h6></div>
    </div>
    <div class="small-img-col"><img src="${gallery2.img}" class="img subImg" alt=""><div class="label"><p>${gallery2.name}</p><h6>$${gallery2.price}</h6></div>
    </div>
    <div class="small-img-col">
      <img src="${gallery3.img}" class="img subImg" alt="">
      <div class="label"><p>${gallery3.name}</p><h6>$${gallery3.price}</h6></div>
    </div></div></div>
<div class="single-pro-details">
  <h6>Home / T-Shirt</h6><h3>${product.name}</h3><h2>$${product.price}</h2>
  <select name="sizes">
    <option value="">Select Size</option><option value="xl">XL</option><option value="xxl">XXL</option><option value="small">Small</option><option value="large">Large</option>
  </select>
  <input type="number" id="sProQuantity" value="1" min="1">
  <button class="cart-button normal">Add To Cart</button>
  <h4>Product Details</h4>
  <span>The <span>${product.name}</span> is made from a substanstial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched comfort with each wear. Feaaturing a taped neck and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
  </div>`;

  proDetails.innerHTML = details;

  const subImg = document.querySelectorAll(".subImg");
  const cartButton = document.querySelector(".cart-button");
  for (let i=0; i < subImg.length; i++) {
    subImg[i].addEventListener("click", clickedSubImage)
  }
  cartButton.addEventListener("click", clickedCartButton);
}

async function clickedSubImage(e) {
  const mainImg = document.getElementById("mainImg");
  const name = document.querySelector(".single-pro-details h3")
  const otherName = document.querySelector(".single-pro-details span span");
  const price = document.querySelector(".single-pro-details h2");
  const src = e.target.src;
  mainImg.src = src;
  const filtered = await filteredProduct(src);
  name.innerHTML = filtered.name;
  price.innerHTML = "$" + filtered.price;
  otherName.innerHTML = filtered.name;
}

async function clickedCartButton(e) {
  const quantity = document.getElementById("sProQuantity").value;
  const button = e.target;
  const img = button.parentElement.parentElement.firstElementChild.firstElementChild.src;
  const filtered = await filteredProduct(img);
  filtered.quantity = Number(quantity);
  addMultipleProItems(filtered);
  window.location.href = "cart.html";
}