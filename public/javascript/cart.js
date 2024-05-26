// open and close cart tab 
const iconCart = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close');
const cartTab = document.querySelector('.cart-tab');

iconCart.addEventListener('click', () => {
  cartTab.classList.toggle('show-cart');
})
closeCart.addEventListener('click', () => {
  cartTab.classList.toggle('show-cart');
})


// ! cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemWrap = document.querySelector('.cart-item-wrap');
const cartItemCountSpan = document.querySelector('.cartItemCount');
const emptyCartMessage = document.querySelector('.empty-cart-message');
const totalPriceElement = document.querySelector('.total-price');

// ? Initialize cart data in local storage
let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

// * Render cart items function
const renderCartItems = () => {
  cartItemWrap.innerHTML = ''; 

  cartData.forEach(item => {
    const cartItemHTML = `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img img-fluid">
        <div class="details d-flex flex-column gap-1 ms-3">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${item.price}</div>
          <input type="number" value="${item.quantity}" class="cart-item-quantity mt-2">
        </div>
        <i class="bi bi-trash-fill remove-from-cart-btn text-danger d-flex justify-content-center"></i>
      </div>
    `;
    const cartItem = document.createElement('div');
    cartItem.innerHTML = cartItemHTML;
    cartItemWrap.appendChild(cartItem); 

    // Attach event listener for remove button
    cartItem.querySelector('.remove-from-cart-btn').addEventListener('click', () => removeFromCart(item.title));
    cartItem.querySelector('.cart-item-quantity').addEventListener('change', (event) => updateQuantity(item.title, event));
  });

  updateTotalPrice(); // Update total price after rendering cart items
  updateCartItemCount(); // Update cart item count after rendering cart items
  checkIfCartIsEmpty(); // Check if cart is empty after rendering cart items
};

// * Add product to cart function
const addProductToCart = (title, price, image) => {
  const existingCartItem = cartData.find(item => item.title === title);

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cartData.push({ title, price, image, quantity: 1 });
  }

  localStorage.setItem('cartData', JSON.stringify(cartData));
  renderCartItems();
};

// ? Attach event listeners to add-to-cart buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const button = event.target;
    const shopProduct = button.closest('.shop-product');
    const title = shopProduct.querySelector('.product-title').textContent;
    const price = shopProduct.querySelector('.product-price').textContent;
    const image = shopProduct.querySelector('.product-image').src;

    addProductToCart(title, price, image);
  });
});

// * Remove item from cart function
const removeFromCart = (title) => {
  cartData = cartData.filter((item) => item.title !== title);
  localStorage.setItem('cartData', JSON.stringify(cartData));
  renderCartItems();
};

// * Update quantity input function
const updateQuantity = (title, event) => {
  const input = event.target;
  const newQuantity = parseInt(input.value);

  if (isNaN(newQuantity) || newQuantity <= 0) {
    input.value = 1; 
    return;
  }

  // Update quantity in local storage
  const itemToUpdate = cartData.find(item => item.title === title);
  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
    localStorage.setItem('cartData', JSON.stringify(cartData));
    updateTotalPrice(); 
    updateCartItemCount(); 
  }
};

// * Update total price of items in cart
const updateTotalPrice = () => {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;

  cartItems.forEach(cartItem => {
    const quantityElement = cartItem.querySelector('.cart-item-quantity');
    const priceElement = cartItem.querySelector('.cart-item-price');
    const quantity = Number(quantityElement.value);
    const price = Number(priceElement.textContent.replace('$', ''));

    total += quantity * price;
  });

  totalPriceElement.textContent = '$' + total.toFixed(2);
};

// * Update cart item count
const updateCartItemCount = () => {
  const totalCount = cartData.reduce((acc, item) => acc + item.quantity, 0);
  cartItemCountSpan.textContent = totalCount;
};

// * Check if cart is empty and display message
const checkIfCartIsEmpty = () => {
  if (cartData.length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
  }
};

// ! Initialize cart when DOM is loaded
renderCartItems();