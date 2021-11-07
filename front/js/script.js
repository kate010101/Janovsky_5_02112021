const products = [
    {
    img: "../../back/images/kanap04.jpeg",
    name:"King Canap",
    price: 1999,
    description: "Super Canap"
    },
    {
    img: "../../back/images/kanap03.jpeg",
    name:"Queen Canap",
    price: 2999,
    description: "Super Canap"
    },
    {
    img: "../../back/images/kanap02.jpeg",
    name:"Wow Canap",
    price: 13999,
    description: "Super Canap"
    },
    {
    img: "../../back/images/kanap01.jpeg",
    name:"Mega Canap",
    price: 999,
    description: "Super Canap"
    },
]



products.forEach(product => {
    document.querySelector('#items').innerHTML += `<a href="./product.html?id=42">
    <article>
      <img src=${product.img} alt="Lorem ipsum dolor sit amet, Kanap name1"/>
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
      <p>${product.price} €</p>
    </article>
  </a>`;
});


