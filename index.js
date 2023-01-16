// ---------------------- Popup ----------------------

window.addEventListener("load", function () {
  setTimeout(function open(event) {
    document.querySelector(".popup").style.display = "flex";
  }, 1000);
});

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});

// ---------------------- Cart ----------------------
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  //Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy Button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
// Buy Button
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// Quanity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.closest(".card");
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert(
        "You have alerady add this item to cart. You can remove it from there or increase the amount of products."
      );
      return;
    }
  }
  var cartBoxContent = `
                            <img src="${productImg}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class="fa fa-trash cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Update Total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  // If price contain some cents value
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// ------------------ Summer Collection ------------------

let products1 = {
  data: [
    {
      productName: "Nike Gray SNKRS",
      category: "Shoes&Socks",
      price: "299",
      productImg: (src = "images/Summer-products/summer1.jpg"),
      score: "7",
    },
    {
      productName: "Vans Collection",
      category: "Shoes&Socks",
      price: "999",
      productImg: (src = "images/Summer-products/summer2.jpg"),
      score: "99",
    },
    {
      productName: "Nike White & Red SNKRS",
      category: "Pants",
      price: "230",
      productImg: (src = "images/Summer-products/summer3.jpg"),
      score: "19",
    },
    {
      productName: "Jeans Set",
      category: "Pants",
      price: "240",
      productImg: (src = "images/Summer-products/summer4.jpg"),
      score: "13",
    },
  ],
};

for (let i of products1.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide", "col-4");
  // Image div
  //let imgContainer = document.createElement("div");
  //imgContainer.classList.add("image-container");
  // Image tag
  let productImg = document.createElement("img");
  productImg.setAttribute("src", i.productImg);
  productImg.classList.add("product-img");
  //imageContainer.appendChild(image);
  card.appendChild(productImg);
  // Container
  let container = document.createElement("div");
  container.classList.add("container");
  // Product name
  let name = document.createElement("a");
  name.href = "product-details-place-holder.html";
  name.classList.add("tytul", "product-name", "product-title");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  // Price
  let price = document.createElement("span");
  price.classList.add("price");
  price.innerText = "$" + i.price;
  container.appendChild(price);

  // Add to Cart
  let buy = document.createElement("i");
  buy.classList.add("fa", "fa-cart-plus", "add-cart");
  container.appendChild(buy);

  buy.onclick = () => {
    cart.classList.add("active");
    buy.classList.add("active");
  };

  // Rating div
  let rating = document.createElement("div");
  rating.classList.add("rating");
  // Stars
  let star = document.createElement("i");
  star.classList.add("fa", "fa-heart");
  rating.appendChild(star);

  // Rating Count
  let score = document.createElement("p");
  score.classList.add("score-white");
  score.innerText = i.score;
  rating.appendChild(score);

  card.appendChild(container);
  card.appendChild(rating);
  document.getElementById("products1").appendChild(card);
}

//Parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //Check if value equals inner Text
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //Select all cards
  let elements = document.querySelectorAll(".card");
  //Loop trough all cards
  elements.forEach((element) => {
    //Display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //Display element based on category
        element.classList.remove("hide");
      } else {
        //Hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //Initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //Loop trought all elements
  elements.forEach((element, index) => {
    //Check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //Display matching card
      cards[index].classList.remove("hide");
    } else {
      //Hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};

// ------------------ Feature Collection ------------------

let products2 = {
  data: [
    {
      productName: "Leaher top",
      category: "Shirts",
      price: "40",
      productImg: (src = "images/Feature-products/Feature1.jpg"),
      score: "5",
    },
    {
      productName: "Red Bandana",
      category: "Shoes&Socks",
      price: "29",
      productImg: (src = "images/Feature-products/Feature2.jpg"),
      score: "21",
    },
    {
      productName: "Adidas Pants",
      category: "Pants",
      price: "120",
      productImg: (src = "images/Feature-products/Feature3.jpg"),
      score: "17",
    },
    {
      productName: "Black Hoodie",
      category: "Pants",
      price: "70",
      productImg: (src = "images/Feature-products/Feature4.jpg"),
      score: "31",
    },
    {
      productName: "Black Baseball Cap",
      category: "Watches",
      price: "39",
      productImg: (src = "images/Feature-products/Feature5.jpg"),
      score: "9",
    },
    {
      productName: "Blue Jeans",
      category: "Shoes&Socks",
      price: "55",
      productImg: (src = "images/Feature-products/Feature6.jpg"),
      score: "13",
    },
    {
      productName: "Lakers Swimsuit",
      category: "Pants",
      price: "80",
      productImg: (src = "images/Feature-products/Feature7.jpg"),
      score: "7",
    },
    {
      productName: "Jeans Dungarees",
      category: "Pants",
      price: "110",
      productImg: (src = "images/Feature-products/Feature8.jpg"),
      score: "23",
    },
  ],
};

for (let i of products2.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide", "col-4");
  // Image div
  //let imgContainer = document.createElement("div");
  //imgContainer.classList.add("image-container");
  // Image tag
  let productImg = document.createElement("img");
  productImg.setAttribute("src", i.productImg);
  productImg.classList.add("product-img");
  //imageContainer.appendChild(image);
  card.appendChild(productImg);
  // Container
  let container = document.createElement("div");
  container.classList.add("container");
  // Product name
  let name = document.createElement("a");
  name.href = "product-details-place-holder.html";
  name.classList.add("tytul", "product-name", "product-title");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  // Price
  let price = document.createElement("span");
  price.classList.add("price");
  price.innerText = "$" + i.price;
  container.appendChild(price);
  // Buy Product
  let buy = document.createElement("i");
  buy.classList.add("fa", "fa-cart-plus", "add-cart");
  container.appendChild(buy);

  buy.onclick = () => {
    cart.classList.add("active");
    buy.classList.add("active");
  };

  // Rating div
  let rating = document.createElement("div");
  rating.classList.add("rating");
  // Stars
  let star = document.createElement("i");
  star.classList.add("fa", "fa-heart");
  rating.appendChild(star);

  // Rating Count
  let score = document.createElement("p");
  score.classList.add("score-white");
  score.innerText = i.score;
  rating.appendChild(score);

  card.appendChild(container);
  card.appendChild(rating);
  document.getElementById("products2").appendChild(card);
}
