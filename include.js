document.addEventListener('DOMContentLoaded', () => {
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
                <h3 class="text-xl font-semibold">${product.name || 'Không có tên'}</h3>
                <p class="text-gray-600">Giá: ${product.price ? product.price.toLocaleString('vi-VN') : 0} VNĐ</p>
                <button onclick="addToCart('${product.id || ''}', '${product.name || ''}', ${product.price || 0}, '${product.image_url || product.image || ''}')" 
                    class="mt-2 bg-green-600 text-white py-1 px-2 rounded">Thêm vào giỏ</button>
                <button onclick="window.location.href='product-detail.html?name=${encodeURIComponent(product.name || '')}'" 
                    class="mt-2 bg-blue-600 text-white py-1 px-2 rounded">Xem thông tin</button>
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