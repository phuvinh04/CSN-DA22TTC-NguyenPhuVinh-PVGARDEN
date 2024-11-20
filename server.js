const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Dữ liệu cây cảnh
const products = [
    {
        id: 1,
        name: "Cây tùng bồng lai tiểu cảnh",
        scientific_name: "N/A",
        description: "Cây tùng bồng lai tiểu cảnh.",
        care: {
            watering: "Tưới 1-2 lần/tuần.",
            sunlight: "Ánh sáng gián tiếp.",
            soil: "Đất tơi xốp."
        },
        price: 500000,
        origin: "N/A",
        image_url: "https://storage.googleapis.com/a1aa/image/Ddzkln6eN8VlTyyhUaLEELlt6GBvxVp1fYo4GdS3Rl6f1enOB.jpg"
    },
    {
        "id": 2,
        "name": "Cây phát tài bờ 5",
        "scientific_name": "N/A",
        "description": "Cây phát tài bờ 5.",
        "care": {
            "watering": "Tưới 1 lần/tuần.",
            "sunlight": "Ánh sáng gián tiếp.",
            "soil": "Đất tơi xốp."
        },
        "price": 750000,
        "origin": "N/A",
        "image_url": "https://storage.googleapis.com/a1aa/image/QKDzVi7uE3rED1JGXegdvo89N7ESaAeLxQMEGNHIizUe1enOB.jpg"
    },
    {
        "id": 3,
        "name": "Cây kim ngân ba thân",
        "scientific_name": "N/A",
        "description": "Cây kim ngân ba thân.",
        "care": {
            "watering": "Tưới 1 lần/tuần.",
            "sunlight": "Ánh sáng gián tiếp.",
            "soil": "Đất tơi xốp."
        },
        "price": 280000,
        "origin": "N/A",
        "image_url": "https://storage.googleapis.com/a1aa/image/fYWsIFOglEQAT6i9p2MTHEjFiE4R5pr1Y7HrArYzUSJdtfpTA.jpg"
    },
    {
        "id": 4,
        "name": "Cây trầu bà đế vương xanh",
        "scientific_name": "Epipremnum aureum 'Imperial Green'",
        "description": "Cây trầu bà đế vương xanh.",
        "care": {
            "watering": "Tưới 1-2 lần/tuần.",
            "sunlight": "Ánh sáng gián tiếp.",
            "soil": "Đất tơi xốp."
        },
        "price": 120000,
        "origin": "Châu Á",
        "image_url": "https://storage.googleapis.com/a1aa/image/GeJ1vhjo5WQXTqT3H7sL9G6hYon27TCVQjR5rIbLxLleafTnA.jpg"
    },
    {
        "id": 5,
        "name": "Cây xương rồng mini",
        "scientific_name": "Cactaceae",
        "description": "Cây xương rồng mini.",
        "care": {
            "watering": "Tưới 1 lần/tuần.",
            "sunlight": "Ánh sáng mạnh.",
            "soil": "Đất cát hoặc đất hỗn hợp."
        },
        "price": 150000,
        "origin": "Châu Mỹ",
        "image_url": "https://storage.googleapis.com/a1aa/image/xuongrong.jpg"
    },
    {
        "id": 6,
        "name": "Cây lô hội",
        "scientific_name": "Aloe vera",
        "description": "Cây lô hội.",
        "care": {
            "watering": "Tưới 1 lần/tuần.",
            "sunlight": "Ánh sáng mạnh.",
            "soil": "Đất tơi xốp."
        },
        "price": 200000,
        "origin": "Châu Phi",
        "image_url": "https://storage.googleapis.com/a1aa/image/aloevera.jpg"
    },
    {
        "id": 7,
        "name": "Cây lan ý",
        "scientific_name": "Spathiphyllum",
        "description": "Cây lan ý.",
        "care": {
            "watering": "Tưới 2 lần/tuần.",
            "sunlight": "Ánh sáng yếu.",
            "soil": "Đất giàu dinh dưỡng."
        },
        "price": 300000,
        "origin": "Nam Mỹ",
        "image_url": "https://storage.googleapis.com/a1aa/image/lany.jpg"
    },
    {
        "id": 8,
        "name": "Cây cọ cảnh",
        "scientific_name": "Chamaedorea",
        "description": "Cây cọ cảnh.",
        "care": {
            "watering": "Tưới 2 lần/tuần.",
            "sunlight": "Ánh sáng gián tiếp.",
            "soil": "Đất tơi xốp."
        },
        "price": 400000,
        "origin": "Trung Mỹ",
        "image_url": "https://storage.googleapis.com/a1aa/image/cocanh.jpg"
    },
    {
        "id": 9,
        "name": "Cây bàng Singapore",
        "scientific_name": "Ficus lyrata",
        "description": "Cây bàng Singapore.",
        "care": {
            "watering": "Tưới 2 lần/tuần.",
            "sunlight": "Ánh sáng mạnh.",
            "soil": "Đất tơi xốp."
        },
        "price": 600000,
        "origin": "Châu Phi",
        "image_url": "https://storage.googleapis.com/a1aa/image/bang.jpg"
    },
    {
        "id": 10,
        "name": "Cây ngọc bích",
        "scientific_name": "Crassula ovata",
        "description": "Cây ngọc bích.",
        "care": {
            "watering": "Tưới 1 lần/tuần.",
            "sunlight": "Ánh sáng mạnh.",
            "soil": "Đất tơi xốp."
        },
        "price": 350000,
        "origin": "Nam Phi",
        "image_url": "https://storage.googleapis.com/a1aa/image/ngocbich.jpg"
    },
    {
        "id": 11,
        "name": "Cây bướm vàng",
        "scientific_name": "Hibiscus rosa-sinensis",
        "description": "Cây bướm vàng.",
        "care": {
            "watering": "Tưới 2 lần/tuần.",
            "sunlight": "Ánh sáng mạnh.",
            "soil": "Đất tơi xốp."
        },
        "price": 250000,
        "origin": "Châu Á",
        "image_url": "https://storage.googleapis.com/a1aa/image/buomvang.jpg"
    }
];

// Đọc dữ liệu từ file data.json
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Sử dụng cors
app.use(cors());

// API để lấy danh sách sản phẩm
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API để lấy danh sách sản phẩm từ data.json
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});