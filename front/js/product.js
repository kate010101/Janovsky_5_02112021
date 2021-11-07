const searchParams = new URLSearchParams(location.search);
let newId = searchParams.get("id");


fetch('http://localhost:3000/api/products/' + newId)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        products(data);
    });


function products(product) {

    let image = document.getElementsByClassName('item__img');
    image.innerHTML += `<img src=${product.imageUrl} alt=${product.altTxt}>`;

    let title = document.getElementById('title');
    title.innerHTML += `${product.name}`;

    let price = document.getElementById('price');
    price.innerHTML += `${product.price}`;

    let description = document.getElementById('description');
    description.innerHTML += `${product.description}`;

    listOptions(product);
};