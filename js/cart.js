

document.addEventListener("DOMContentLoaded", () => {
  const product = getMultipleProItems();
  displayCartItems(product);
  updateTotal();
});

async function displayCartItems(items) {
  const tbody = document.querySelector("#cart tbody");
  let price = 0; result = ""; shippingFee = 0;
  let product = items.map(item => {
    price += item.price;
    shippingFee += item.shipping;
    result += `
    <tr class="cart-row" data-id="${item.id}">
      <td><a href="#" class="remove"><i class='bx bxs-x-circle'></i></a></td>
      <td><img src="${item.img}" alt=""></td>
      <td>${item.name}</td>
      <td class="cart-price">$${item.price}</td>
      <td><input type="number" min="1" value="${item.quantity}" class="cart-quantity"></td>
      <td class="price-total">$${item.price}</td>
    </tr>
    `;
  })
  result +=  `<td></td><td></td><td></td><td></td><td></td>
  <td><strong class="total">$${price}</strong></td>`
  tbody.innerHTML = result;

  const removeBtns = tbody.querySelectorAll(".remove");
  for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener("click", removeProduct)
  }

  const quantityInputs = tbody.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", updateTotal);
  }
  
  document.getElementById("shipping-fee").innerText = "$" + shippingFee;
}

function removeProduct(event) {
  const tbody = document.querySelector("#cart tbody");
  const productRow = event.target.parentElement.parentElement.parentElement;
  const id = productRow.dataset.id;
  tbody.removeChild(productRow);
  removeProductFromLS(id);
  const product = getMultipleProItems();
  displayCartItems(product);
  updateTotal();
}