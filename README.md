# WildDuck API Documentation

Интерактивная документация для WildDuck Mail Server API с использованием Swagger UI.
Ссылка на сам сервер: https://docs.wildduck.email/

## Возможности

- 📖 Интерактивная документация API
- 🔍 Поиск по эндпоинтам
- 🧪 Возможность тестирования API прямо из интерфейса
- 📱 Адаптивный дизайн
- 🔐 Поддержка аутентификации через токены
- 🎨 Современный интерфейс Swagger UI 5.x
- 🚀 Быстрая загрузка и отзывчивость
- 📋 Автоматическая валидация запросов

## Требования

- Node.js 14+ 
- npm 6+

## Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск сервера разработки

```bash
npm start
```

Или для автоматической перезагрузки при изменениях:

```bash
npm run dev
```

### Альтернативный запуск с http-server

```bash
npm run serve
```

## Доступ к документации

После запуска сервера откройте браузер и перейдите по адресу:

- **Документация API**: http://localhost:3000
- **OpenAPI Spec**: http://localhost:3000/api/spec
- **Health Check**: http://localhost:3000/health

## Структура проекта

```
\project\open-api-wildduck-mail-server\
├── index.html          # Основная страница с Swagger UI
├── server.js           # Express сервер
├── package.json        # Зависимости и скрипты
├── open-api.json       # OpenAPI спецификация WildDuck API
├── .gitignore         # Игнорируемые файлы Git
└── README.md          # Этот файл
```

## Конфигурация

### Изменение порта

Установите переменную окружения `PORT`:

```bash
PORT=8080 npm start
```

### Изменение URL сервера API

Отредактируйте секцию `servers` в файле `index.html` или `open-api.json`:

```json
"servers": [
    {
        "url": "https://your-wildduck-server.com/api",
        "description": "Production server"
    },
    {
        "url": "http://localhost:8080/api",
        "description": "Development server"
    }
]
```

### Переменные окружения

Создайте файл `.env` для локальной конфигурации:

```env
PORT=3000
NODE_ENV=development
API_BASE_URL=https://your-wildduck-server.com/api
```

## Использование

### Базовое использование

1. Откройте документацию в браузере
2. Изучите доступные эндпоинты API
3. Просмотрите схемы запросов и ответов

### Тестирование API

1. **Аутентификация**: Нажмите "Authorize" и введите ваш X-Access-Token
2. **Выбор эндпоинта**: Найдите нужный API эндпоинт
3. **Тестирование**: Нажмите "Try it out"
4. **Параметры**: Заполните обязательные и опциональные параметры
5. **Выполнение**: Нажмите "Execute" для отправки запроса
6. **Результат**: Изучите ответ сервера

### Популярные эндпоинты

- `GET /users` - Список пользователей
- `POST /users` - Создание пользователя
- `GET /users/{user}/mailboxes` - Почтовые ящики пользователя
- `POST /users/{user}/submit` - Отправка сообщения
- `GET /audit` - Журнал аудита

## Аутентификация

WildDuck API использует токены доступа для аутентификации:

### Получение токена

```bash
# Пример получения токена (замените на ваши данные)
curl -X POST https://your-wildduck-server.com/api/authenticate \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your-username",
    "password": "your-password"
  }'
```

### Использование токена

1. В Swagger UI нажмите кнопку "Authorize" 🔒
2. Введите токен в поле "X-Access-Token"
3. Нажмите "Authorize"
4. Токен будет автоматически добавлен ко всем запросам

## Разработка

### Запуск в режиме разработки

```bash
# Установка зависимостей для разработки
npm install

# Запуск с автоперезагрузкой
npm run dev

# Проверка кода
npm run lint # (если настроен)
```

### Структура OpenAPI

Документация автоматически загружается из файла `open-api.json` и преобразуется в формат OpenAPI 3.0 для совместимости с современными версиями Swagger UI.

### Добавление новых эндпоинтов

1. Отредактируйте `open-api.json`
2. Следуйте спецификации OpenAPI 3.0
3. Перезапустите сервер для применения изменений
4. Проверьте корректность в Swagger UI

### Кастомизация интерфейса

Для изменения внешнего вида отредактируйте CSS в `index.html`:

```css
.swagger-ui .topbar {
    background-color: #your-color;
}
```

## Поддержка браузеров

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ⚠️ IE не поддерживается

## Устранение неполадок

### Проблемы с загрузкой

1. **Проверьте консоль браузера** на наличие ошибок JavaScript
2. **Убедитесь, что файл open-api.json валиден** - используйте онлайн-валидатор
3. **Проверьте сетевые запросы** в DevTools

### Проблемы с CORS

Если возникают проблемы с CORS при тестировании API:

```javascript
// В server.js добавьте более специфичные CORS настройки
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-domain.com'],
    credentials: true
}));
```

### Проблемы с аутентификацией

- Убедитесь, что токен действителен
- Проверьте правильность заголовка `X-Access-Token`
- Проверьте время жизни токена

## Docker

Для контейнеризации создайте `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Запуск с Docker:

```bash
docker build -t wildduck-api-docs .
docker run -p 3000:3000 wildduck-api-docs
```

## Производство

### Оптимизация для продакшена

1. Используйте переменную `NODE_ENV=production`
2. Настройте reverse proxy (nginx/Apache)
3. Включите HTTPS
4. Настройте кэширование статических файлов

### Nginx конфигурация

```nginx
server {
    listen 80;
    server_name api-docs.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Содействие

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

