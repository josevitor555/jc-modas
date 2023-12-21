let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");

let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");

const addToCartButtons = document.querySelectorAll(".addCart");

let carts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const updateCart = () => {
  listCartHTML.innerHTML = "";

  carts.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="Image Item not found">
      <div class="name">${item.name}</div>
      <div class="totalPrice">R$${item.price.toFixed(2)}</div>
      <div class="quantityItem">
        <span class="minus"><i class="fa-solid fa-minus"></i></span>
        <span>${item.quantity}</span>
        <span class="plus"><i class="fa-solid fa-plus"></i></span>
      </div>
    `;

    listCartHTML.appendChild(cartItem);

    const minusButton = cartItem.querySelector(".minus");
    const plusButton = cartItem.querySelector(".plus");

    minusButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        updateCart();
      }
    });
    plusButton.addEventListener("click", () => {
      item.quantity++;
      updateCart();
    });
  });

  iconCartSpan.textContent = carts.reduce((total, item) => total + item.quantity, 0);

  const totalPriceElement = document.createElement("button");
  totalPriceElement.classList.add("totalPriceButton");

  const totalPrice = carts.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  totalPriceElement.textContent = `Total: ${formattedTotalPrice}`;
  listCartHTML.appendChild(totalPriceElement);
};

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const itemName = button.getAttribute("data-name");
    const itemPrice = parseFloat(button.getAttribute("data-price"));
    const itemImage = button.getAttribute("data-image");

    const existingItem = carts.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      carts.push({
        name: itemName,
        price: itemPrice,
        image: itemImage,
        quantity: 1,
      });
    }

    updateCart();
  });
});