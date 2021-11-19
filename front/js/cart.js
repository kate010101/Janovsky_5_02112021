// Sélectionne la div pour afficher les articles
let cartItems = document.querySelector("#cart__items");
// Récupère les données du localStorage
let saveProductLocalStorage = JSON.parse(localStorage.getItem("cart"));

// Affiche tous les produits du panier
for (let i = 0; i < saveProductLocalStorage.length; i++) {
  cartItems.innerHTML += `<article class="cart__item" data-id="${saveProductLocalStorage[i]._id}" data-color="${saveProductLocalStorage[i].colors}">
      <div class="cart__item__img">
        <img src="${saveProductLocalStorage[i].imageUrl}" alt="${saveProductLocalStorage[i].alttxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${saveProductLocalStorage[i].name}</h2>
          <p>${saveProductLocalStorage[i].color}</p>
          <p>${saveProductLocalStorage[i].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : ${saveProductLocalStorage[i].quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveProductLocalStorage[i].qty}"/>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
}

// Stock les éléments dans des tableaux
let deleteItemContainer = [...document.getElementsByClassName("deleteItem")];
let quantityContainer = [...document.getElementsByClassName("itemQuantity")];

// Supprime le produit
deleteItemContainer.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Dans le DOM
    let pickArticle = deleteItemContainer[index].closest(".cart__item");
    pickArticle.remove();
    // Dans le local storage
    saveProductLocalStorage.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(saveProductLocalStorage));
    location.reload();
  });
});

// Modifie la quantité
quantityContainer.forEach((item, index) => {
  // Au click, modifie l'item (le produit) sur le LocalStorage
  item.addEventListener("change", () => {
    saveProductLocalStorage[index].qty = quantityContainer[index].value;
    localStorage.setItem("cart", JSON.stringify(saveProductLocalStorage));
    location.reload();
  });
});

// Total des produits
let sumProduct = 0;

for (let q = 0; q < saveProductLocalStorage.length; q++) {
  let quantityLoop = parseInt(saveProductLocalStorage[q].qty);
  sumProduct += quantityLoop;
}

let totalQuantity = document.querySelector("#totalQuantity");
totalQuantity.innerHTML = sumProduct;

// Total du panier à jour
let sumMoney = 0;

for (let m = 0; m < saveProductLocalStorage.length; m++) {
  let moneyLoop = parseInt(saveProductLocalStorage[m].price);
  sumMoney += moneyLoop * saveProductLocalStorage[m].qty;
}

let totalMoney = document.querySelector("#totalPrice");
totalMoney.innerHTML = sumMoney;

/*console.log("Je suis dans le panier", JSON.parse(localStorage.getItem("cart")));

let cart = JSON.parse(localStorage.getItem("cart"));

let productInCart = {};

let toDelete = {};

let cartItem = document.querySelector("#cart__items");

cart.forEach((productInCart) => {
  cartItem.innerHTML += `<article class="cart__item" data-id="${
    productInCart.Id
  }">
                <div class="cart__item__img">
                  <img src=${productInCart.imageUrl} alt="${
    productInCart.altTxt
  }"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${productInCart.name}</h2>
                    <p>${productInCart.color}</p>
                    <p>${
                      productInCart.price * productInCart.quantity + " €"
                    }</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${productInCart.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  btnSupprimer();
});

function btnSupprimer() {
  let deleteBtns = document.querySelectorAll(".deleteItem");
  console.log(deleteBtns);

  for (let i = 0; i < deleteBtns.length; i++) {
    var toDelete = deleteBtns[i];
    toDelete.addEventListener("click", () => {
      console.log("Il faut supprimer ce produit");
      cart.pop(productInCart);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    });
  }
}

/*
function popProductToCart() {
  let currentListCart = JSON.parse(localStorage.getItem("cart"));

  for (let i = 0; i < currentListCart.length; i++) {
    if (
      currentListCart[i].Id == currentListCart.Id &&
      currentListCart.color == currentListCart[i].color
    ) {
      document.querySelector(".deleteItem").addEventListener("click", () => {
        console.log("Sera supprimé");
      });
    }
  }
    if (!flag) currentListCart.push(currentProductToAdd);
    localStorage.setItem("cart", JSON.stringify(currentListCart));
}
*/

/*

function btnSupprimer() {
  document.querySelector(".deleteItem").addEventListener("click", () => {
  console.log("A supprimer du panier");
});

  for (let p = 0; p < deleteBtn.length; p++) {
    deleteBtn[p].addEventListener("click", () => {
      console.log("Il faut supprimer ce produit " + productInCart);
    });
  }
}*/

/*
function btnSupprimer(productInCart) {
  let deleteBtns = document.querySelectorAll(".deleteItem");
  console.log(deleteBtns);

  for (let product = 0; product < cart.length; product++) {
    let productInCart = cart[product];
    console.log(productInCart);
  }

  for (let i = 0; i < deleteBtns.length; i++) {
    var toDelete = deleteBtns[i];
    toDelete.addEventListener("click", () => {
      console.log("Il faut supprimer ce produit");
      cart.pop(productInCart);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    });
  }
}
*/

/*

for (let product = 0; product < cart.length; product++) {
  var productInCart = cart[product];
}
*/
/*
function btnSupprimer() {
  let deleteBtns = document.querySelectorAll(".deleteItem");
  console.log(deleteBtns);

  for (let i = 0; i < deleteBtns.length; i++) {
    var toDelete = deleteBtns[i];
    toDelete.addEventListener("click", () => {
      console.log("Il faut supprimer ce produit");
      cart.pop(productInCart);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    });
  }
}
*/
