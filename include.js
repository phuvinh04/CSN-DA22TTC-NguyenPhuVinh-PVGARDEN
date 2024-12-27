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