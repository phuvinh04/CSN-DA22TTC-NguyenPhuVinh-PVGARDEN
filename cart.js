// Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Hàm cập nhật số lượng hiển thị trên icon giỏ hàng
function updateCartCount() {
    const cartCount = document.getElementById('cartItemCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productId, name, price, image) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // Cập nhật số lượng trên icon giỏ hàng
    updateCartCount();

    // Hiển thị thông báo
    alert('Đã thêm sản phẩm vào giỏ hàng!');
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(newQuantity);
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cartItems', JSON.stringify(cart));
            displayCart();
            updateCartCount();
        }
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Hàm hiển thị giỏ hàng
function displayCart() {
    const cartTableBody = document.querySelector('tbody');
    const totalElement = document.querySelector('tfoot td:nth-child(2)');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const cartContent = document.querySelector('.cart-content');

    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (!cartTableBody) return;

    if (cart.length === 0) {
        if (cartContent) cartContent.style.display = 'none';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        return;
    }

    if (cartContent) cartContent.style.display = 'block';
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';

    cartTableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        // Tạo hàng sản phẩm
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mr-4">
                    <span>${item.name}</span>
                </div>
            </td>
            <td class="px-6 py-4">${item.price.toLocaleString('vi-VN')} VNĐ</td>
            <td class="px-6 py-4">
                <input type="number" value="${item.quantity}" min="1" 
                       class="w-20 px-2 py-1 border rounded-md" 
                       data-id="${item.id}">
            </td>
            <td class="px-6 py-4">${subtotal.toLocaleString('vi-VN')} VNĐ</td>
            <td class="px-6 py-4">
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded" 
                        data-id="${item.id}">
                    Xóa
                </button>
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    if (totalElement) {
        totalElement.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
    }

    // Thêm sự kiện cho nút "Xóa" và input "Số lượng"
    document.querySelectorAll('button[data-id]').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            removeFromCart(productId);
        });
    });

    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            updateQuantity(productId, this.value);
        });
    });
}

// Cập nhật số lượng khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    displayCart();
});
