var originalPrice = 100;
var currentQuantities = {};

var rows = document.querySelectorAll(".row");

var productsContainer = document.getElementById("products-container");
var restoreProducts = document.getElementById("restoreProducts");

rows.forEach(function (row, index) {
  var moreButton = row.querySelector("#moreButton");
  var lessButton = row.querySelector("#lessButton");
  var removeCard = row.querySelector("#removeCard");

  currentQuantities[index] = 1;

  removeCard.addEventListener("click", function () {
    row.remove();
    checkAllRemoved();
  });

  moreButton.addEventListener("click", function () {
    incrementFunction(index);
  });

  lessButton.addEventListener("click", function () {
    decrementFunction(index);
  });

  function incrementFunction(rowIndex) {
    currentQuantities[rowIndex]++;
    updateDisplay(row);
  }

  function decrementFunction(rowIndex) {
    if (currentQuantities[rowIndex] > 1) {
      currentQuantities[rowIndex]--;
      updateDisplay(row);
    }
  }

  function updateDisplay(row) {
    var priceElement = row.querySelector("#productPrice");
    var quantityElement = row.querySelector("#quantity");

    var formattedPrice = (
      originalPrice * currentQuantities[index]
    ).toLocaleString("pt-Br", {
      style: "currency",
      currency: "BRL",
    });

    priceElement.innerText = formattedPrice;
    quantityElement.innerText = "Quantidade: " + currentQuantities[index];

    checkAllRemoved();
  }
});

function checkAllRemoved() {
  var allRowsRemoved = Array.from(rows).every(function (row) {
    return !document.body.contains(row);
  });

  var restoreProducts = document.getElementById(
    "restoreProducts"
  );
  restoreProducts.style.display = allRowsRemoved ? "block" : "none";
}