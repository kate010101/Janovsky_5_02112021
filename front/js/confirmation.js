// Sélectionne l'id OrderID de la page confirmation sur le DOM
let selectOrderId = document.querySelector("#orderId");
console.log(selectOrderId);
// Recherche de la valeur orderId dans l'URL de la page de confirmation 
const searchParams = new URLSearchParams(location.search);
let orderId = searchParams.get("orderId");
// Insère l'orderId récupéré dans l'URL
selectOrderId.innerHTML = orderId;
// Vide le localStorage
localStorage.clear("cart");


 