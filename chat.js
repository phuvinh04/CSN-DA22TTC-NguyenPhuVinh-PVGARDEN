// Đợi DOM load xong mới chạy code
document.addEventListener('DOMContentLoaded', () => {
    let isChatOpen = true;

    // Toggle chat
    window.toggleChat = function() {
        const chatMessages = document.getElementById('chat-messages');
        const chatForm = document.getElementById('chat-form');
        const toggleBtn = document.getElementById('chat-toggle');
        
        isChatOpen = !isChatOpen;
        
        if (isChatOpen) {
            chatMessages.style.display = 'block';
            chatForm.style.display = 'flex';
            toggleBtn.textContent = '−';
        } else {
            chatMessages.style.display = 'none';
            chatForm.style.display = 'none';
            toggleBtn.textContent = '+';
        }
    }

    // Thêm tin nhắn vào khung chat
    function addMessage(message, isUser = false) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        
        messageDiv.innerHTML = `
            <div class="${isUser ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} 
                        rounded-lg px-4 py-2 max-w-[80%]">
                ${message}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Xử lý gửi tin nhắn
    document.getElementById('chat-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        addMessage(message, true);
        input.value = '';
        
        try {
            const response = await window.handleChat(message);
            addMessage(response);
        } catch (error) {
            addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    });

    // Thêm tin nhắn chào mừng
    addMessage('Xin chào! Tôi có thể giúp gì cho bạn?');
});