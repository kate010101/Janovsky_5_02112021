const searchParams = new URLSearchParams(location.search);
let newId = searchParams.get("id");


fetch('http://localhost:3000/api/products/' + newId)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        seeProduct(data);
    });


function seeProduct(product) {

    var image = new Image();    
    image.src = product.imageUrl;

    let imgProduct = document.getElementsByClassName('item__img');
    imgProduct[0].appendChild(image);
    imgProduct.innerHTML += `<img src=${product.imageUrl} alt=${product.altTxt}>`;

    let title = document.getElementById('title');
    title.innerHTML += `${product.name}`;

    let price = document.getElementById('price');
    price.innerHTML += `${product.price}`;

    let description = document.getElementById('description');
    description.innerHTML += `${product.description}`;

    listOptions(product);
};

function listOptions(product) {
    for(let i=0; i< product.colors.length; i++) {
            
        var option = new Option();
        option.value = product.colors[i];
        option.text = product.colors[i];

        let optionColor = document.getElementById('colors');
        optionColor.appendChild(option);
    };
};