// Récupération de chaque paramètre id de l'URL
const searchParams = new URLSearchParams(location.search);
// Id du produit
let newId = searchParams.get("id");
// Produit de la page
let currentProduct = {};
// Affiche le produit
getProducts();

// Pour récupérer les informations du produit et créer sa page propre
function getProducts() {
  fetch("http://localhost:3000/api/products/" + newId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentProduct = data;
      seeProduct(data);
    })
    .catch((error) => {
      console.log(" Erreur lors de la récupération des produits ", error);
    });
}

// Pour insérer chaque information descriptive
function seeProduct(product) {
  var image = new Image();
  image.src = product.imageUrl;

  let imgProduct = document.getElementsByClassName("item__img");
  imgProduct[0].appendChild(image);
  imgProduct.innerHTML += `<img src=${product.imageUrl} alt=${product.altTxt}>`;

  let title = document.getElementById("title");
  title.innerHTML += `${product.name}`;

  let price = document.getElementById("price");
  price.innerHTML += `${product.price}`;

  let description = document.getElementById("description");
  description.innerHTML += `${product.description}`;

  // Pour afficher les choix de couleur du produit
  listOptions(product);
}

// Pour créer les choix de couleurs possibles pour chaque produit
function listOptions(product) {
  for (let i = 0; i < product.colors.length; i++) {
    // Crée une option par couleur possible
    var option = new Option();
    option.value = product.colors[i];
    option.text = product.colors[i];

    // Ajoute une option par couleur possible dans la liste
    let optionColor = document.getElementById("colors");
    optionColor.appendChild(option);
  }
}

// Crée l'évènement au click sur le bouton "ajouter"
document.querySelector("#addToCart").addEventListener("click", () => {
  console.log("Cliqué");
  // Quantité indiquée
  var quantity = document.querySelector("#quantity").value;
  // Quantité retenue du produit
  currentProduct.quantity = quantity;
  // Insertion de la description du produit
  var description = document.querySelector("#description").innerHTML;
  // Couleurs possibles
  var color = colors.value;
  // Couleur choisie du produit
  currentProduct.color = color;
  console.log("La description est " + description);
  console.log("La valeur de la quantité est " + quantity);
  console.log("La couleur choisie est : " + color);
  console.log("Le produit courant à enregistrer est : ", currentProduct);

  // Ajoute le produit au panier
  addProductToCart(currentProduct);
});

// Pour ajouter le produit
function addProductToCart(currentProductToAdd) {
  let currentListCart = JSON.parse(localStorage.getItem("cart"));
  // Si le panier du localStorage est vide
  if (currentListCart == null) {
    // Créera un tableau vide
    currentListCart = [];
    // Et y ajoutera le produit
    currentListCart.push(currentProductToAdd);
    localStorage.setItem("cart", JSON.stringify(currentListCart));
    // Si le panier n'est pas vide
  } else {
    // Me permet de savoir si j'ai trouvé l'élément ou pas (si le produit existe déjà dans le panier ou pas)
    let flag = false;
    // Vérifie la correspondance du produit
    for (let i = 0; i < currentListCart.length; i++) {
      // Si un produit de même id est déjà présent et de la même couleur que ceux à ajouter
      if (
        currentListCart[i]._id == currentProductToAdd._id &&
        currentProductToAdd.color == currentListCart[i].color
      ) {
        // Additionnera la quantité voulue en plus de celle déjà au panier
        currentListCart[i].quantity =
          parseInt(currentProductToAdd.quantity) +
          parseInt(currentListCart[i].quantity);
        // Tourne le drapeau pour arrêter la recherche de la boucle
        flag = true;
      }
    }
    // Si le drapeau est toujours false (le produit n'est pas dans le panier), il ajoutera le produit au panier
    if (!flag) currentListCart.push(currentProductToAdd);
    localStorage.setItem("cart", JSON.stringify(currentListCart));
  }
}
