// Khởi tạo chat history
let history = [];

// Hàm đợi Google AI API load xong
function waitForGoogleAI() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 20;
        let attempts = 0;
        
        const checkAPI = setInterval(() => {
            attempts++;
            if (window.GoogleGenerativeAI) {
                clearInterval(checkAPI);
                resolve(window.GoogleGenerativeAI);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkAPI);
                reject(new Error('Không thể load Google AI API'));
            }
        }, 500); // Kiểm tra mỗi 500ms
    });
}

// Hàm xử lý chat
async function handleChat(userInput) {
    try {
        // Đợi API load xong
        const GoogleGenerativeAI = await waitForGoogleAI();
        
        // Khởi tạo API với key
        const genAI = new GoogleGenerativeAI('AIzaSyCBd51mGsemds4JR_OqJgXmB28Vu5jtUos'); // Thay API key thực
        
        const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            generationConfig: {
                temperature: 0.9,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192
            }
        });

        // Tạo chat mới
        const chat = model.startChat({history});
        
        // Gửi tin nhắn và nhận phản hồi
        const result = await chat.sendMessage(userInput);
        const response = await result.response.text();

        // Cập nhật history
        history.push({role: "user", parts: userInput});
        history.push({role: "model", parts: response});

        return response;

    } catch (error) {
        console.error("Lỗi:", error);
        return "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";
    }
}

// Export ra window
window.handleChat = handleChat;