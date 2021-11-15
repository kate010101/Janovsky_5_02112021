console.log("Je suis dans le panier", JSON.parse(localStorage.getItem("cart")));

let cart = JSON.parse(localStorage.getItem("cart"));

function seeCart() {
  let cartItem = document.querySelector("#cart__items");
  cart.forEach((currentProduct) => {
    cartItem.innerHTML += `<article class="cart__item" data-id="${
      currentProduct.Id
    }">
                <div class="cart__item__img">
                  <img src=${currentProduct.imageUrl} alt="${
      currentProduct.altTxt
    }"/>
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${currentProduct.name}</h2>
                    <p>${currentProduct.color}</p>
                    <p>${
                      currentProduct.price * currentProduct.quantity + " €"
                    }</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${currentProduct.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
  });
}

seeCart(cart);
