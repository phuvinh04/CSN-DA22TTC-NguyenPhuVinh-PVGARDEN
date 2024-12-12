const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Phục vụ các file tĩnh từ thư mục public

// API endpoints
app.get('/api/products', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
        res.json(data.products);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đọc dữ liệu sản phẩm' });
    }
});

app.get('/api/chaucay', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
        res.json(data.chaucay);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đọc dữ liệu chậu cây' });
    }
});

app.get('/api/xuongrong-senda', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
        res.json(data['xuongrong-senda']);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đọc dữ liệu xương rồng và sen đá' });
    }
});

app.get('/api/phanbon', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
        res.json(data.phanbon);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đọc dữ liệu phân bón' });
    }
});

app.get('/api/dungcu', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
        res.json(data.dungcu);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đọc dữ liệu dụng cụ' });
    }
});

app.get('/api/dat', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
        res.json(data.dat);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi đọc dữ liệu đất' });
    }
});


// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});