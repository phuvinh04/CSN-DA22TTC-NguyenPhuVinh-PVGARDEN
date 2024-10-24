// Chức năng nút đăng nhập
document.getElementById('loginBtn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Chức năng đăng nhập đang được phát triển. Vui lòng thử lại sau!');
});

// Xử lý biểu mẫu đánh giá
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('reviewerName').value;
    var text = document.getElementById('reviewText').value;
    var rating = document.getElementById('reviewRating').value;
    
    // Tạo phần tử đánh giá mới
    var newReview = document.createElement('div');
    newReview.className = 'bg-white p-6 rounded-lg shadow-md';
    newReview.innerHTML = `
        <blockquote class="mb-4">
            <p class="text-gray-600 italic">"${text}"</p>
            <footer class="text-gray-500 mt-2">- ${name} (${rating} sao)</footer>
        </blockquote>
    `;
    
    // Thêm đánh giá mới vào container
    var reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
    
    // Đặt lại biểu mẫu
    this.reset();
    
    // Hiển thị thông báo thành công
    alert('Cảm ơn bạn đã gửi đánh giá!');
});



// Khởi tạo
loadFavoritesFromLocalStorage();
updateFavoriteButtons();
displayFavoriteProducts();
