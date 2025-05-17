function redirectToCategory(type) {
    window.location.href = `module/category.html?type=${encodeURIComponent(type)}`;
  }

  const params = new URLSearchParams(window.location.search);
  const selectedType = params.get('type');
  const productContainer = document.getElementById("filtered-products");

const filteredProducts = products.filter(p => p.type === selectedType);

if (filteredProducts.length === 0) {
  productContainer.innerHTML = "<p>Không có sản phẩm nào thuộc loại này.</p>";
} else {
  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-item"; // 👉 áp class chính cho sản phẩm
    div.onclick = () => selectProduct(product.id);
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${product.price} VND</p>
    <button class="add-to-cart" onclick="addToCartById(${product.id}, event)">Thêm vào giỏ hàng</button>
  `;
    productContainer.appendChild(div);
  });
}function redirectToCategory(type) {
 window.location.href = `../module/category.html?type=${encodeURIComponent(type)}`;}