// Sélectionne l'id de la page confirmation.html sur le DOM
let tagOrderId = document.querySelector("#orderId");
 console.log(tagOrderId);
 // Récupération de valeur orderId de la clé data du sessionStorage 
 var orderId = JSON.parse(sessionStorage.getItem("data"));
 console.log(orderId);
 // Insère l'orderId récupéré du serveur
 tagOrderId.innerHTML = orderId;
 // Vide le localStorage
 localStorage.clear("cart");


 