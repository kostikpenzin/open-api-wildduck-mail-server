const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Основной маршрут для документации
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API маршрут для получения OpenAPI спецификации
app.get('/api/spec', (req, res) => {
    res.sendFile(path.join(__dirname, 'open-api.json'));
});

// Маршрут для проверки здоровья сервера
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'WildDuck API Documentation Server is running',
        timestamp: new Date().toISOString()
    });
});

// Обработка 404
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found'
    });
});

// Обработка ошибок
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong on the server'
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 WildDuck API Documentation Server is running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}`);
    console.log(`🔍 OpenAPI Spec: http://localhost:${PORT}/api/spec`);
    console.log(`❤️ Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
