let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'PRODUCT NAME 1', image: '1.PNG', price: 120000 },
    { id: 2, name: 'PRODUCT NAME 2', image: '2.PNG', price: 120000 },
    { id: 3, name: 'PRODUCT NAME 3', image: '3.PNG', price: 220000 },
    { id: 4, name: 'PRODUCT NAME 4', image: '4.PNG', price: 123000 },
    { id: 5, name: 'PRODUCT NAME 5', image: '5.PNG', price: 320000 },
    { id: 6, name: 'PRODUCT NAME 6', image: '6.PNG', price: 120000 }
];

let listCards = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from localStorage

// Initialize the application
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
    reloadCart(); // Reload the cart to display items
}

initApp();

// Add item to cart
function addToCart(key) {
    if (listCards[key] == null) {
        // Copy product from list to listCards and set quantity to 1
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity += 1; // Increase quantity if product is already in the cart
    }
    saveCart(); // Save to localStorage
    reloadCart(); // Reload the cart display
}

// Reload cart display
function reloadCart() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
                <button onclick="removeFromCart(${key})">Remove</button>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

// Change the quantity of an item in the cart
function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        removeFromCart(key); // If quantity reaches 0, remove item
    } else {
        listCards[key].quantity = quantity;
    }
    saveCart(); // Save to localStorage
    reloadCart(); // Reload the cart display
}

// Remove an item from the cart
function removeFromCart(key) {
    delete listCards[key]; // Delete the item from the cart
    saveCart(); // Save to localStorage
    reloadCart(); // Reload the cart display
}

// Save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}
