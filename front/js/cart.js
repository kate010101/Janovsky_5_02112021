console.log("Je suis dans le panier", JSON.parse(localStorage.getItem("cart")));

let cart = JSON.parse(localStorage.getItem("cart"));

function seeCart() {
  let cartItem = document.querySelector("#cart__items");
  cartItem.innerHTML += `<article class="cart__item" data-id="${cart.Id}">
                <div class="cart__item__img">
                  <img src=${cart.imageUrl} alt="${cart.altTxt}"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${cart.name} ${cart.color}</h2>
                    <p>${cart.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${cart.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}

seeCart(cart);
