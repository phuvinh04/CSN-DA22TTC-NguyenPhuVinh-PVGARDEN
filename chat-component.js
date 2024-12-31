class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.isChatOpen = true;
    }

    connectedCallback() {
        this.innerHTML = `
            <section id="chat-container" class="fixed bottom-4 right-4 w-80">
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="bg-green-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                        <h3 class="font-semibold">PV GARDEN</h3>
                        <button id="chat-toggle-btn" class="hover:text-gray-200">
                            <span id="chat-toggle">−</span>
                        </button>
                    </div>
                    
                    <div id="chat-messages" class="h-80 overflow-y-auto p-4 space-y-4">
                    </div>

                    <div class="border-t p-4">
                        <form id="chat-form" class="flex gap-2">
                            <input type="text" 
                                   id="chat-input"
                                   class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-green-500"
                                   placeholder="Nhập tin nhắn...">
                            <button type="submit" 
                                    class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;

        this.initializeChat();
    }

    async initializeChat() {
        const chatForm = this.querySelector('#chat-form');
        const toggleBtn = this.querySelector('#chat-toggle-btn');

        toggleBtn.addEventListener('click', () => this.toggleChat());

        // Đợi cho đến khi handleChat được định nghĩa
        const waitForHandleChat = () => {
            if (window.handleChat) {
                chatForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const input = this.querySelector('#chat-input');
                    const message = input.value.trim();
                    
                    if (!message) return;
                    
                    this.addMessage(message, true);
                    input.value = '';
                    input.disabled = true;
                    
                    try {
                        const response = await window.handleChat(message);
                        this.addMessage(response);
                    } catch (error) {
                        console.error('Chat error:', error);
                        this.addMessage('Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.');
                    } finally {
                        input.disabled = false;
                        input.focus();
                    }
                });
            } else {
                setTimeout(waitForHandleChat, 100);
            }
        };

        waitForHandleChat();

        // Tin nhắn chào mừng
        this.addMessage('Xin chào! Tôi có thể giúp gì cho bạn?');
    }

    toggleChat() {
        const chatMessages = this.querySelector('#chat-messages');
        const chatForm = this.querySelector('#chat-form');
        const toggleBtn = this.querySelector('#chat-toggle');
        
        this.isChatOpen = !this.isChatOpen;
        
        if (this.isChatOpen) {
            chatMessages.style.display = 'block';
            chatForm.style.display = 'flex';
            toggleBtn.textContent = '−';
        } else {
            chatMessages.style.display = 'none';
            chatForm.style.display = 'none';
            toggleBtn.textContent = '+';
        }
    }

    addMessage(message, isUser = false) {
        const chatMessages = this.querySelector('#chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
        
        const messageContent = isUser ? message : marked.parse(message);
        
        messageDiv.innerHTML = `
            <div class="${isUser ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} 
                        rounded-lg px-4 py-2 max-w-[80%]">
                ${messageContent}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

customElements.define('chat-component', ChatComponent); 