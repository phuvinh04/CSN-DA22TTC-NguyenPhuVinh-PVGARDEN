let cart = JSON.parse(localStorage.getItem('cart')) || [];
let reviews = JSON.parse(localStorage.getItem('productReviews')) || [];

function addToCart(productId, productName, productPrice, quantity) {
    console.log("Adding to cart:", productId, productName, productPrice, quantity);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity,
            image: document.getElementById('productImage').src
        });
    }

    updateCartDisplay();
    saveCartToLocalStorage();

    // Hiển thị thông báo thêm vào giỏ hàng thành công
    const addToCartButton = document.querySelector('#addToCartForm button[type="submit"]');
    const originalText = addToCartButton.textContent;
    addToCartButton.textContent = 'Đã thêm vào giỏ hàng';
    addToCartButton.disabled = true;
    setTimeout(() => {
        addToCartButton.textContent = originalText;
        addToCartButton.disabled = false;
    }, 2000);
}

function updateCartDisplay() {
    console.log("Updating cart display");
    const cartItemCount = document.getElementById('cartItemCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartItemCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Cập nhật nội dung giỏ hàng
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item d-flex align-items-center mb-2">
                <img src="${item.image}" alt="${item.name}" class="me-2" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <p class="mb-0">Giá: ${item.price.toLocaleString()} VNĐ</p>
                    <div class="quantity-controls">
                        <button class="btn btn-sm btn-secondary decrease-quantity" data-id="${item.id}">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-secondary increase-quantity" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="ms-auto">
                    <p class="mb-0">Tổng: ${itemTotal.toLocaleString()} VNĐ</p>
                    <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Xóa</button>
                </div>
            </div>
        `;
    });

    // Cập nhật tổng giá trị giỏ hàng
    cartTotal.textContent = total.toLocaleString();
}

function saveCartToLocalStorage() {
    console.log("Saving cart to localStorage:", cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToLocalStorage();
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            saveCartToLocalStorage();
        }
    }
}

function addReview(name, rating, comment) {
    const newReview = {
        id: Date.now(),
        name: name,
        rating: rating,
        comment: comment,
        date: new Date().toLocaleDateString()
    };
    reviews.push(newReview);
    saveReviewsToLocalStorage();
    displayReviews();
}

function saveReviewsToLocalStorage() {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
}

function displayReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = '';

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p>Chưa có đánh giá nào cho sản phẩm này.</p>';
        return;
    }

    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        reviewsContainer.innerHTML += `
            <div class="review mb-3">
                <div class="d-flex justify-content-between">
                    <h5>${review.name}</h5>
                    <span class="text-warning">${stars}</span>
                </div>
                <p class="mb-1">${review.comment}</p>
                <small class="text-muted">${review.date}</small>
            </div>
        `;
    });

    updateReviewStats();
}

function updateReviewStats() {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

    document.getElementById('totalReviews').textContent = totalReviews;
    document.getElementById('averageRating').textContent = averageRating.toFixed(1);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    updateCartDisplay();
    displayReviews();

    const addToCartForm = document.getElementById('addToCartForm');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log("Add to cart form submitted");
            const productId = 1; // Assuming this is product ID 1
            const productName = document.getElementById('productName').textContent;
            const productPrice = parseFloat(document.getElementById('productPrice').textContent.replace(/\D/g, ''));
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(productId, productName, productPrice, quantity);
        });
    } else {
        console.error("Add to cart form not found");
    }

    document.getElementById('cartItems').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        } else if (e.target.classList.contains('decrease-quantity')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            changeQuantity(productId, -1);
        } else if (e.target.classList.contains('increase-quantity')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            changeQuantity(productId, 1);
        }
    });

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reviewName').value;
            const rating = parseInt(document.getElementById('reviewRating').value);
            const comment = document.getElementById('reviewComment').value;
            addReview(name, rating, comment);
            reviewForm.reset();
            var reviewModal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
            reviewModal.hide();
        });
    } else {
        console.error("Review form not found");
    }

    const openReviewModalBtn = document.getElementById('openReviewModalBtn');
    if (openReviewModalBtn) {
        openReviewModalBtn.addEventListener('click', function() {
            var reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
            reviewModal.show();
        });
    } else {
        console.error("Open review modal button not found");
    }
});

// Open cart modal when clicking on cart icon
const cartLink = document.getElementById('cartLink');
if (cartLink) {
    cartLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Cart link clicked");
        var cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });
} else {
    console.error("Cart link not found");
}

