Запуск в dev:

```
yarn --cwd apps/client dev
yarn --cwd apps/server dev
```

Swagger
```
http://localhost:3000/docs
http://localhost:3000/docs/json
```

Генерация типов:

```
cd apps/client
npx -y orval --config orval.config.ts
```