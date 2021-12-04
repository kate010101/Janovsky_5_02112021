// // Récupère les informations de l'API
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.length);
    // Affiche chaque produits avec ses informations propres
    productsList(data);
  })
  .catch(function (error) {
    console.log("Error");
  });

// Pour afficher tous les produits
function productsList(product) {
  for (let i = 0; i < product.length; i++) {
    console.log(product[i]);
    // Insère les informations du produit en HTML
    document.querySelector("#items").innerHTML += 
      `<a href="./product.html?id=${product[i]._id}">
        <article>
            <img src=${product[i].imageUrl} alt="Lorem ipsum dolor sit amet, Kanap name1">
            <h3 class="productName">${product[i].name}</h3>
            <p class="price" >${product[i].price + "€"}</p>
            <p class="productDescription">${product[i].description}</p>
        </article>
      </a>`;
  }
}
