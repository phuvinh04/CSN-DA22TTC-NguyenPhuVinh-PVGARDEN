import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { trainingHistory } from './training-data.js';

// Khởi tạo history với dữ liệu huấn luyện
const history = [...trainingHistory];

// Cấu hình generation
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Hàm xử lý chat
async function handleChat(userInput) {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyDEzWnUzDQmYw-UxItuiz7QVQi7RvXMiTw");
        const model = genAI.getGenerativeModel({
            model: "gemini-exp-1206"
        });
        
        // Thêm câu hỏi của người dùng vào history
        history.push({
            role: "user",
            parts: [{text: userInput}]
        });
        
        const chat = model.startChat({
            generationConfig,
            history
        });
        
        const result = await chat.sendMessage(userInput);
        const response = await result.response.text();
        
        // Thêm câu trả lời của AI vào history
        history.push({
            role: "model",
            parts: [{text: response}]
        });
        
        return response;

    } catch (error) {
        console.error("Lỗi:", error);
        return "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";
    }
}

// Export ra window
window.handleChat = handleChat;