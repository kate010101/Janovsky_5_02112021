const searchParams = new URLSearchParams(location.search);
let newId = searchParams.get("id");
let currentProduct = {};

getProducts();

/**/
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

/**/
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

  listOptions(product);
}

function listOptions(product) {
  for (let i = 0; i < product.colors.length; i++) {
    var option = new Option();
    option.value = product.colors[i];
    option.text = product.colors[i];

    let optionColor = document.getElementById("colors");
    optionColor.appendChild(option);
  }
}

document.querySelector("#addToCart").addEventListener("click", () => {
  console.log("Cliqué");
  var quantity = document.querySelector("#quantity").value;
  currentProduct.quantity = quantity;
  var description = document.querySelector("#description").innerHTML;
  var color = colors.value;
  currentProduct.color = color;
  console.log("La description est " + description);
  console.log("La valeur de la quantité est " + quantity);
  console.log("La couleur choisie est : " + color);
  console.log("Le produit courant à enregistrer est : ", currentProduct);

  let dansLeLocalStorage = JSON.parse(localStorage.getItem("cart"));
  console.log(dansLeLocalStorage);

  if (dansLeLocalStorage) {
    dansLeLocalStorage.push(currentProduct);
    localStorage.setItem("cart", JSON.stringify(dansLeLocalStorage));
    console.log(dansLeLocalStorage);
  } else {
    dansLeLocalStorage = [];
    dansLeLocalStorage.push(currentProduct);
    localStorage.setItem("cart", JSON.stringify(dansLeLocalStorage));
    console.log(dansLeLocalStorage);
  }
});
