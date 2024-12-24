document.addEventListener('DOMContentLoaded', () => {
    // Thêm Font Awesome nếu chưa có
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Load navigation
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            // Khởi tạo search sau khi nav đã được load
            initializeSearch();
        });

    // Load footer 
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });

    // Lấy dữ liệu sản phẩm từ data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const allProducts = [
                ...data.products || [],
                ...data.chaucay || [],
                ...data.xuongrongSenda || [],
                ...data.phanbon || [], 
                ...data.dungcu || [],
                ...data.dat || []
            ];

            console.log('Tổng số sản phẩm:', allProducts.length);
            displayProducts(allProducts);
        })
        .catch(error => console.error('Lỗi khi tải sản phẩm:', error));

    // Hàm hiển thị sản phẩm
    function displayProducts(products) {
        const productsContainer = document.getElementById('products-container');
        if(!productsContainer) {
            console.error('Không tìm thấy products-container');
            return;
        }

        productsContainer.innerHTML = ''; // Xóa nội dung cũ

        products.forEach(product => {
            if(!product) return; // Bỏ qua nếu sản phẩm null/undefined

            const productDiv = document.createElement('div');
            productDiv.className = 'bg-white p-4 rounded shadow cursor-pointer';
            productDiv.innerHTML = `
                <h3 class="text-2xl font-bold text-green-800 mb-3">${product.name || 'Không có tên'}</h3>
                <p class="text-lg text-gray-600 mb-3">Giá: ${product.price ? product.price.toLocaleString('vi-VN') : 0} VNĐ</p>
                <div class="flex gap-2">
                    <button onclick="addToCart('${product.id || ''}', '${product.name || ''}', ${product.price || 0}, '${product.image_url || product.image || ''}')" 
                        class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-base font-semibold">
                        <i class="fas fa-cart-plus mr-2"></i>Thêm vào giỏ
                    </button>
                    <button onclick="window.location.href='product-detail.html?name=${encodeURIComponent(product.name || '')}'" 
                        class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-base font-semibold">
                        <i class="fas fa-info-circle mr-2"></i>Xem thông tin
                    </button>
                </div>
            `;
            productsContainer.appendChild(productDiv);
        });
    }
});

// Thêm script search.js
const searchScript = document.createElement('script');
searchScript.src = 'search.js';
document.head.appendChild(searchScript);

function removeFromCart() {
    if (cartItemCount > 0) {
        cartItemCount--;
        updateCartCount();
    }
}

function addToCart() {
    cartItemCount++;
    updateCartCount();
}