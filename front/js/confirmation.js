
let tagOrderId = document.querySelector("#orderId");
 console.log(tagOrderId);
 
 var orderId = JSON.parse(sessionStorage.getItem("data"));
 console.log(orderId);

 tagOrderId.innerHTML = orderId;
 