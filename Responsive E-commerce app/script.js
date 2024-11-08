/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.querySelector('.cart__container');
    const cartPricesItem = document.querySelector('.cart__prices-item');
    const cartPricesTotal = document.querySelector('.cart__prices-total');
    const checkoutButton = document.getElementById('checkout-button');
    const paymentForm = document.getElementById('payment-form');
    const paymentConfirmation = document.getElementById('payment-confirmation');
    const selectedPaymentMethodSpan = document.getElementById('selected-payment-method');
    const finalTotalSpan = document.getElementById('final-total');

    // Load cart items from localStorage
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartContainer.innerHTML = '';  // Clear the current cart content

        cartItems.forEach(item => {
            // Create and append each cart item dynamically
            const cartCard = document.createElement('article');
            cartCard.classList.add('cart__card');
            cartCard.innerHTML = `
                <div class="cart__box">
                    <img src="${item.image}" alt="" class="cart__img">
                </div>
                <div class="cart__details">
                    <h3 class="cart__title">${item.name}</h3>
                    <span class="cart__price">$${item.price}</span>
                    <div class="cart__amount">
                        <div class="cart__amount-content">
                            <span class="cart__amount-box">
                                <i class="bx bx-minus"></i>
                            </span>
                            <span class="cart__amount-number">${item.quantity}</span>
                            <span class="cart__amount-box">
                                <i class="bx bx-plus"></i>
                            </span>
                        </div>
                        <i class="bx bx-trash-alt cart__amount-trash"></i>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartCard);
        });

        updateCartPrices();
    }

    // Save cart items to localStorage
    function saveCart() {
        const cartItems = [];
        document.querySelectorAll('.cart__card').forEach(card => {
            const name = card.querySelector('.cart__title').innerText;
            const price = parseFloat(card.querySelector('.cart__price').innerText.replace('$', '').replace(',', ''));
            const quantity = parseInt(card.querySelector('.cart__amount-number').innerText, 10);
            const image = card.querySelector('.cart__img').src;

            cartItems.push({ name, price, quantity, image });
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartPrices();
    }

    // Function to update the cart's total price and item count
    function updateCartPrices() {
        let totalItems = 0;
        let totalPrice = 0;

        document.querySelectorAll('.cart__card').forEach(function (card) {
            const quantity = parseInt(card.querySelector('.cart__amount-number').innerText, 10);
            const price = parseFloat(card.querySelector('.cart__price').innerText.replace('$', '').replace(',', ''), 10);

            totalItems += quantity;
            totalPrice += quantity * price;
        });

        // Update the UI for total items and total price
        cartPricesItem.innerText = `${totalItems} items`;
        cartPricesTotal.innerText = `$${totalPrice.toLocaleString()}`;
    }

    // Event listener for each "plus" button
    cartContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('bx-plus')) {
            const quantitySpan = e.target.closest('.cart__card').querySelector('.cart__amount-number');
            let quantity = parseInt(quantitySpan.innerText, 10);
            quantitySpan.innerText = quantity + 1;
            saveCart(); // Save updated cart to localStorage
        }

        // Event listener for each "minus" button
        if (e.target.classList.contains('bx-minus')) {
            const quantitySpan = e.target.closest('.cart__card').querySelector('.cart__amount-number');
            let quantity = parseInt(quantitySpan.innerText, 10);
            if (quantity > 1) {
                quantitySpan.innerText = quantity - 1;
                saveCart(); // Save updated cart to localStorage
            }
        }

        // Event listener for each "trash" button
        if (e.target.classList.contains('cart__amount-trash')) {
            const card = e.target.closest('.cart__card');
            card.remove(); // Remove the entire cart item
            saveCart(); // Save updated cart to localStorage
        }
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', function () {
        const selectedPaymentMethod = paymentForm.querySelector('input[name="payment-method"]:checked');
        if (selectedPaymentMethod) {
            const totalAmount = cartPricesTotal.innerText;
            const paymentMethod = selectedPaymentMethod.value;

            selectedPaymentMethodSpan.innerText = paymentMethod;
            finalTotalSpan.innerText = totalAmount;

            paymentConfirmation.style.display = 'block'; // Show the payment confirmation
        } else {
            alert('Please select a payment method before proceeding!');
        }
    });

    // Load the cart when the page loads
    loadCart();

});




 // new swiper

        
        
           
        

        
 let newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 24,
  loop: 'true',

breakpoints: {
576: {
  slidesPerView: 2,
  
},
768: {
  slidesPerView: 3,
  
},
1024: {
  slidesPerView: 4,

},
},
});

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})