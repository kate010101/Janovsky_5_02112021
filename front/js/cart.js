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
          <p>Couleur : ${productsLocalStorage[i].color}</p>
          <p>Prix : ${productsLocalStorage[i].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p id="qte${i}">Qté : ${productsLocalStorage[i].quantity}</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsLocalStorage[i].quantity}"/>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem"><br/>Supprimer</p>
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
    // Empêche une quantité à 0 ou négative
    if (quantityContainer[index].value >= 1) {
      productsLocalStorage[index].quantity = quantityContainer[index].value;
      localStorage.setItem("cart", JSON.stringify(productsLocalStorage));
      document.querySelector("#qte" + index).innerHTML =
        "Qté : " + quantityContainer[index].value;
      sumQuantityProduct();
      sumPriceInCart();
    } else {
      alert("Merci de saisir une quantité positive ou de supprimer le produit du panier");
    }
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
var formRegex = new RegExp("^[éèçùàa-zA-Z- ]{3,}$");
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
// Fonction qui récupère les Id des produits dans le panier
function getProductIdFromCart() {
  let listProductId = [];
  for (
    let index = 0;
    index < JSON.parse(localStorage.getItem("cart")).length;
    index++
  ) 
  // Et qui retourne les résultats dans un tableau
  {
    listProductId[index] = JSON.parse(localStorage.getItem("cart"))[index]._id;
  }
  console.log("Le tableau de produit de mes ID est : " + listProductId);
  return listProductId;
}

  
// Fonction effectuée au clique du bouton commander pour passer la commande
command.addEventListener("click", (event) => {
  // Evite le fonctionnement automatique du bouton
  event.preventDefault();
  // Si le formulaire est mal rempli, empêche de passer la commande
  if (emailForm.value < 1 || cityForm.value < 1 || addressForm.value < 1 || lastName.value < 1 || firstName.value < 1) {
    alert("Formulaire de contact incorrect.\nMerci de remplir les champs concernés.");
  } else {
    // Création de l'objet contact
    let contact = {
      "firstName": firstName.value,
      "lastName": lastName.value,
      "address": addressForm.value,
      "city": city.value,
      "email": emailForm.value,
    };

    // Création de la variable réunissant les id des produits du panier
    let listProductId = getProductIdFromCart();
    console.log("Cliqué ! " + JSON.stringify(contact), listProductId);
    // Requête "Clé": Valeur, en envoyant les infos de contact et d'id
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "contact": contact,
        "products": listProductId
      }),
    })
    // Retourne la réponse en format JSON
      .then(function (response) {
        return response.json();
      })
      // Récupère les données de la réponse serveur 
      .then(function (data) {
        console.log(data.orderId);
        orderId = data.orderId;
        // Redirige l'utilisateur sur la page confirmation contenant l'orderId dans l'URL de celle-ci
        window.location.href = `confirmation.html?orderId=${data.orderId}`;
      })
      .catch((e) => console.log("il y a une erreur sur la page :" + e));
  }
});
   

