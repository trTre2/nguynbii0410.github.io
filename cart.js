let cart = [];
function addToCartById(productId, e) {
    e.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error('Không tìm thấy sản phẩm:', productId);
    return;
  }
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCartToLocal();
  updateCartCount();
  renderCartItems();
}
function removeFromCart(productId) {
    cart = cart.filter(item => String(item.id) !== String(productId));
  updateCartCount();
  renderCartItems();
  saveCartToLocal();
}
function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalCount;
}
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li>Giỏ hàng trống</li>';
    return;
  }
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = ` ${item.name} x \t ${item.quantity} - ${item.price * item.quantity}đ
      <button onclick="event.stopPropagation();removeFromCart('${item.id}')">Xoá</button>`;
    cartItemsContainer.appendChild(li);
  });
}

function toggleCartDetails() {
  const cartDetails = document.getElementById('cart-details');
  cartDetails.style.display = cartDetails.style.display === 'none' ? 'block' : 'none';
}
function saveCartToLocal() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function loadCartFromLocal() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCartCount();
      renderCartItems();
    }
  }
  function getSelectedProductId() {
    const productData = localStorage.getItem("selectedProduct");
    if (productData) {
      const product = JSON.parse(productData); // Chuyển đổi từ JSON thành đối tượng JavaScript
      return product.id; // Trả về ID của sản phẩm
    }
    return null; // Nếu không tìm thấy, trả về null
  }
  function addCurrentProductToCart() {
    const productId = getSelectedProductId();
    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;
  
    const quantityInput = document.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value) || 1;
  
    const existing = cart.find(item => String(item.id) === String(productId));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
  
    saveCartToLocal();
    updateCartCount();
    renderCartItems();
  }
  document.addEventListener("DOMContentLoaded", () => {loadCartFromLocal();});