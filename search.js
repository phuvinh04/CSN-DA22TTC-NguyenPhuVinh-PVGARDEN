function initializeSearch() {
    // Đợi một chút để đảm bảo DOM đã được load
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const searchResults = document.getElementById('searchResults');
        const resultsList = document.getElementById('resultsList');
        
        if (!searchInput || !searchButton || !searchResults || !resultsList) {
            console.error('Không tìm thấy các elements cần thiết cho tìm kiếm');
            return;
        }
        
        let allProducts = [];
        
        // Tải dữ liệu sản phẩm từ tất cả các danh mục
        Promise.all([
            fetch('http://localhost:3000/api/products'),
            fetch('http://localhost:3000/api/chaucay'),
            fetch('http://localhost:3000/api/xuongrong-senda'), 
            fetch('http://localhost:3000/api/phanbon'),
            fetch('http://localhost:3000/api/dungcu'),
            fetch('http://localhost:3000/api/dat')
        ])
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(([products, chaucay, xuongrongSenda, phanbon, dungcu, dat]) => {
            allProducts = [
                ...products || [],
                ...chaucay || [],
                ...xuongrongSenda || [],
                ...phanbon || [],
                ...dungcu || [],
                ...dat || []
            ];
            console.log('Đã tải tất cả sản phẩm:', allProducts.length);
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });

        // Xử lý khi nhập text
        searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase().trim();
          console.log('Đang tìm kiếm:', searchTerm);
          
          if (searchTerm === '') {
            searchResults.classList.add('hidden');
            return;
          }

          const filteredProducts = allProducts.filter(product => 
            product && product.name && product.name.toLowerCase().includes(searchTerm)
          );

          console.log('Kết quả tìm được:', filteredProducts.length);

          resultsList.innerHTML = '';
          
          if (filteredProducts.length > 0) {
            searchResults.classList.remove('hidden');
            filteredProducts.slice(0, 5).forEach(product => {
              const div = document.createElement('div');
              div.className = 'p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150';
              div.innerHTML = `
                <div class="flex items-center space-x-4">
                  <img src="${product.image_url || product.image || ''}" 
                    class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onerror="this.src='images/default-product.jpg'">
                  <div class="flex-1 min-w-0">
                    <div class="text-sm text-gray-800 font-medium line-clamp-2">${product.name || 'Không có tên'}</div>
                    <div class="text-sm font-semibold text-green-600 mt-1">
                      ${(product.price || 0).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </div>
              `;
              div.addEventListener('click', () => {
                window.location.href = `product-detail.html?name=${encodeURIComponent(product.name || '')}`;
              });
              resultsList.appendChild(div);
            });

            if (filteredProducts.length > 5) {
              const viewMore = document.createElement('div');
              viewMore.className = 'p-3 text-center text-sm text-green-600 hover:bg-gray-50 cursor-pointer font-medium transition-colors duration-150 border-t border-gray-100';
              viewMore.textContent = `Xem thêm ${filteredProducts.length - 5} sản phẩm`;
              viewMore.addEventListener('click', () => {
                // Chuyển đến trang kết quả tìm kiếm với đầy đủ từ khóa tìm kiếm
                window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
              });
              resultsList.appendChild(viewMore);
            }
          } else {
            searchResults.classList.remove('hidden');
            const div = document.createElement('div');
            div.className = 'p-4 text-center text-gray-500';
            div.textContent = 'Không tìm thấy sản phẩm';
            resultsList.appendChild(div);
          }
        });

        // Ẩn kết quả khi click ra ngoài
        document.addEventListener('click', (e) => {
          if (!searchInput.contains(e.target) && 
              !searchResults.contains(e.target) && 
              !searchButton.contains(e.target)) {
            searchResults.classList.add('hidden');
          }
        });
    }, 100);
}

// Bỏ phần tự động khởi tạo ở cuối file vì sẽ được gọi từ include.js