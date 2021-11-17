console.log("Je suis dans le panier", JSON.parse(localStorage.getItem("cart")));

let cart = JSON.parse(localStorage.getItem("cart"));

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
});

/*for (let products = 0; products < cart.length; products++) {
  var productInCart = cart[products];
  if () {

  }
  console.log(productInCart.Id);*/

//console.log(cart[0], cart[1], cart[2]);
