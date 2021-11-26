// Sélectionne la div pour afficher les articles
let cartItems = document.querySelector("#cart__items");
// Récupère les données du localStorage
let productsLocalStorage = JSON.parse(localStorage.getItem("cart"));
//Fonction pour l'affichage du panier
function showCart() {
  // Affiche tous les produits du panier
  for (let i = 0; i < productsLocalStorage.length; i++) {
    cartItems.innerHTML += `<article class="cart__item" data-id="${productsLocalStorage[i]._id}" data-color="${productsLocalStorage[i].colors}">
      <div class="cart__item__img">
        <img src="${productsLocalStorage[i].imageUrl}" alt="${productsLocalStorage[i].alttxt}" />
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${productsLocalStorage[i].name}</h2>
          <p>${productsLocalStorage[i].color}</p>
          <p>${productsLocalStorage[i].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p id="qte${i}">Qté : ${productsLocalStorage[i].quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsLocalStorage[i].quantity}"/>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  }
}
// Appelle la fonction d'affichage
showCart();

// Stock les éléments dans des tableaux
let deleteItemContainer = [...document.getElementsByClassName("deleteItem")];
let quantityContainer = [...document.getElementsByClassName("itemQuantity")];

// Supprime le produit
deleteItemContainer.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Dans le DOM
    let article = deleteItemContainer[index].closest(".cart__item");
    article.remove();
    // Dans le local storage
    productsLocalStorage.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(productsLocalStorage));
    location.reload();
  });
});

// Modifie la quantité
quantityContainer.forEach((item, index) => {
  // Au click, modifie l'item (le produit) sur le LocalStorage
  item.addEventListener("change", () => {
    productsLocalStorage[index].quantity = quantityContainer[index].value;
    localStorage.setItem("cart", JSON.stringify(productsLocalStorage));
    document.querySelector("#qte" + index).innerHTML =
      "Qté : " + quantityContainer[index].value;
    sumQuantityProduct();
    sumPriceInCart();
  });
});
// Appelle la fonction de calcul de la quantité totale
sumQuantityProduct();
// Appelle la fonction de calcul de la somme totale
sumPriceInCart();

// Total des produits
function sumQuantityProduct() {
  let sumProduct = 0;

  for (let q = 0; q < productsLocalStorage.length; q++) {
    let articlesQuantity = parseInt(productsLocalStorage[q].quantity);
    sumProduct += articlesQuantity;
  }

  let totalQuantity = document.querySelector("#totalQuantity");
  totalQuantity.innerHTML = sumProduct;
}

// Total du panier à jour
function sumPriceInCart() {
  let sumMoney = 0;

  for (let m = 0; m < productsLocalStorage.length; m++) {
    let prices = parseInt(productsLocalStorage[m].price);
    sumMoney += prices * parseInt(productsLocalStorage[m].quantity);
  }

  let totalMoney = document.querySelector("#totalPrice");
  totalMoney.innerHTML = sumMoney;
}

// Controle du formulaire
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const buttonValidation = document.getElementById("order");

/*var emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;*/

// Caractères acceptables
var formRegex = new RegExp("^[a-zA-Z-]+$");
// Selection du champ "Pénom"
let firstName = document.querySelector("#firstName");
// Fonction de vérification de la saisie
firstName.addEventListener("change", () => {
  var test = firstName.value.length == null || formRegex.test(firstName.value);
  if (!test) {
    console.log("pas juste " + firstName.value);
    firstNameErrorMsg.innerHTML = "Merci de vérifier le champ saisi";
  } else {
    console.log("juste");
  }
});
