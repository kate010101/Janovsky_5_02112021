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

let command = document.querySelector("#order");

/*Nom et Prénom
Caractères acceptables*/
var formRegex = new RegExp("^['éèçùàa-zA-Z- ]{3,}$");
// Selection du champ "Pénom"
let firstName = document.querySelector("#firstName");
// Fonction de vérification de la saisie du Prénom
firstName.addEventListener("change", () => {
  var test = firstName.value.length == null || formRegex.test(firstName.value);
  if (!test) {
    firstNameErrorMsg.innerHTML = "Merci de corriger le champ saisi";
    command.addEventListener("click", function (event) {
      event.preventDefault();
    });
    firstName.value = null;
    console.log("pas juste " + firstName.value + " Bouton commander bloqué");
  } else {
    firstNameErrorMsg.innerHTML = "";
  }
});
// Selection du champ "Nom"
let lastName = document.querySelector("#lastName");
// Fonction de vérification de la saisie du Nom
lastName.addEventListener("change", () => {
  var test = lastName.value.length == null || formRegex.test(lastName.value);
  if (!test) {
    lastNameErrorMsg.innerHTML = "Merci de corriger le champ saisi";
    command.addEventListener("click", function (event) {
      event.preventDefault();
    });
    lastName.value = null;
    console.log("pas juste " + lastName.value + " Bouton commander bloqué");
  } else {
    lastNameErrorMsg.innerHTML = "";
  }
});

//Adresse
// Caractères acceptables
var addressRegex = new RegExp("^[éèçùàa-zA-Z-,0-9 ]+$");
// Selection du champ "Adresse"
let addressForm = document.querySelector("#address");
// Fonction de vérification de la saisie de l'Adresse
addressForm.addEventListener("change", () => {
  var test =
    addressForm.value.length == null || addressRegex.test(addressForm.value);
  if (!test) {
    addressErrorMsg.innerHTML = "Merci de corriger le champ saisi";
    command.addEventListener("click", function (event) {
      event.preventDefault();
    });
    addressForm.value = null;
    console.log("pas juste " + addressForm.value + " Bouton commander bloqué");
  } else {
    addressErrorMsg.innerHTML = "";
  }
});
//City
// Selection du champ "Ville"
let cityForm = document.querySelector("#city");
// Fonction de vérification de la saisie de Ville
cityForm.addEventListener("change", () => {
  var test = cityForm.value.length == null || addressRegex.test(cityForm.value);
  if (!test) {
    cityErrorMsg.innerHTML = "Merci de corriger le champ saisi";
    command.addEventListener("click", function (event) {
      event.preventDefault();
    });
    cityForm.value = null;
    console.log("pas juste " + cityForm.value + " Bouton commander bloqué");
  } else {
    cityErrorMsg.innerHTML = "";
  }
});

// E-mail
// Caractères acceptables @ et un . obligatoires
var emailRegex = new RegExp(".+@.+[..].");
// Selection du champ "E-mail"
let emailForm = document.querySelector("#email");
// Fonction de vérification de la saisie de e-mail
emailForm.addEventListener("change", () => {
  var test = emailForm.value.length == null || emailRegex.test(emailForm.value);
  if (!test) {
    emailErrorMsg.innerHTML = "Merci de corriger le champ saisi";
    command.addEventListener("click", function (event) {
      event.preventDefault();
    });
    emailForm.value = null;
    console.log("pas juste " + emailForm.value + " Bouton commander bloqué");
  } else {
    emailErrorMsg.innerHTML = "";
  }
});

//Bouton Commander

function getProductIdFromCart() {
  let listProductId = [];
  for (
    let index = 0;
    index < JSON.parse(localStorage.getItem("cart")).length;
    index++
  ) {
    listProductId[index] = JSON.parse(localStorage.getItem("cart"))[index]._id;
  }
  console.log("Le tableau de produit de mes ID est : " + listProductId);
  return listProductId;
}

command.addEventListener("click", (event) => {
  debugger;
  let contact = {
    "firstName": firstName.value,
    "lastName": lastName.value,
    "address": addressForm.value,
    "city": city.value,
    "email": emailForm.value,
  };
  let listProductId = getProductIdFromCart();
  console.log("Cliqué ! " + JSON.stringify(contact), listProductId);
  
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "contact": contact,
      "products": listProductId
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.orderId);
      orderId = data.orderId;
      sessionStorage.setItem("data",JSON.stringify(orderId));
      
    })
    .catch((e) => console.log("il y a une erreur sur la page :" + e));
});
