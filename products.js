let completedata;
fetch('https://fakestoreapi.com/products').then((data) => {
    return data.json()
}).then((data) => {
    completedata = data;
    displayItems(completedata);
}).catch((err) => { err });

function displayItems(data) {
    let products = '';
    data.map((item, index) => {
        products += `<div class="item">
                        <div class="img-container">
                            <img src=${item.image} class="img" alt="img1">
                        </div>
                        <div class="item-details">
                            <h1 class="title">${item.title}</h1>
                            <h2 class="price">$ <span>${item.price}</span> </h2>
                            <button class="button" onclick="addToCart(${index})">Add to cart</button>
                        </div>
                    </div>`;
    });
    document.getElementById("products").innerHTML = products;
    // <a href="#" class="category">${item.category}</a> 
}

document.getElementById("search").addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = completedata.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchData)
        )
    })
    displayItems(filteredData);
});

document.querySelector(".cart-icon").addEventListener('click', () => {
    document.querySelector("body").classList.toggle('showCart');
    displayCart();

})

document.querySelector(".close").addEventListener('click', () => {
    document.querySelector("body").classList.toggle('showCart');
})

var cart = [];

function addToCart(id) {
    cart.push(completedata[id]);
    // console.log(cart);
    displayCart();
}

function deleteItem(id){
    cart.splice(id,1);
    displayCart();
}

function displayCart() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.length;

    let cartProducts = '';
    if (cart.length == 0) {
        document.getElementById('cart-list').innerText = "Your cart is empty!";
        // document.getElementById('cart-list').style.textAlign = "center";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    }
    else {
        cart.map((item,index) => {
            cartProducts += `<div class="cart-item">
                                <div class="cart-item-img">
                                    <img src="${item.image}" alt="img">
                                </div>
                                <h1 class="title">${item.title}</h1>
                                <h2 class="price">${item.price}</h2>
                                <i class="fa-solid fa-trash" onclick="deleteItem(${index})"></i>
                            </div>`
            total=total+item.price;
        });
        document.getElementById("cart-list").innerHTML = cartProducts;
        document.getElementById("total").innerHTML = "$ "+total+".00";
    }
}