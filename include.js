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

    // Gọi API để lấy sản phẩm
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error));

    // Hàm hiển thị sản phẩm
    function displayProducts(products) {
        const productsContainer = document.getElementById('products-container'); // Thay đổi ID theo cấu trúc HTML của bạn
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'bg-white p-4 rounded shadow cursor-pointer';
            productDiv.innerHTML = `
                <h3 class="text-xl font-semibold">${product.name}</h3>
                <p class="text-gray-600">Giá: ${product.price} VNĐ</p>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image_url}')" class="mt-2 bg-green-600 text-white py-1 px-2 rounded">Thêm vào giỏ</button>
                <button onclick="window.location.href='product-detail.html?name=${product.name}'" class="mt-2 bg-blue-600 text-white py-1 px-2 rounded">Xem thông tin</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Thêm chức năng tìm kiếm
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    searchButton.addEventListener('click', async function() {
        const query = searchInput.value.toLowerCase();
        const products = await getProducts();
        const results = products.filter(product => product.name.toLowerCase().includes(query));

        // Hiển thị kết quả tìm kiếm
        const searchResultsDiv = document.getElementById('searchResults');
        searchResultsDiv.innerHTML = results.map(product => `
            <div>
                <h3>${product.name} - ${product.price}đ</h3>
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;"/>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')" class="mt-2 bg-green-600 text-white py-1 px-2 rounded">Thêm vào giỏ</button>
                <button onclick="window.location.href='product-detail.html?name=${product.name}'" class="mt-2 bg-blue-600 text-white py-1 px-2 rounded">Xem thông tin</button>
            </div>
        `).join('');
        searchResultsDiv.classList.remove('hidden');
    });

    // Đợi DOM load xong
    const element = document.getElementById('your-element-id'); // Thay bằng ID thực
    if (element) {
        element.addEventListener('click', function() {
            // Xử lý sự kiện click
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