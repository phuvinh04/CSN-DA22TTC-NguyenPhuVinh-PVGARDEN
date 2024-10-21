let cart = [];
let total = 0;

function showProductDetail(name, price, description) {
    document.getElementById('product-name').innerText = name;
    document.getElementById('product-price').innerText = `Giá: ${price} VNĐ`;
    document.getElementById('product-description').innerText = description;
    document.getElementById('product-detail').style.display = 'block';
    document.getElementById('products').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'none';
}

function hideProductDetail() {
    document.getElementById('product-detail').style.display = 'none';
    document.getElementById('products').style.display = 'block';
}

function addToCart() {
    const name = document.getElementById('product-name').innerText;
    const price = parseInt(document.getElementById('product-price').innerText.split(': ')[1]);
    cart.push({ name, price });
    total += price;
    updateCart();
    hideProductDetail();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ${item.price} VNĐ`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').innerText = `Tổng cộng: ${total} VNĐ`;
}

function checkout() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
}

function submitForm(event) {
    event.preventDefault();
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
    // Reset cart and total
    cart = [];
    total = 0;
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-price').innerText = '';
    document.getElementById('checkout-form').reset();
    document.getElementById('checkout').style.display = 'none';
}
