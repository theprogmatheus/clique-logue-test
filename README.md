# Teste FullStack - Clique Loque

Projeto desenvolvido como teste técnico FullStack, contendo backend em **Node.js (Fastify + Prisma)** e frontend em **React (Vite + TypeScript)**.

---

## Requisitos

* Node.js 18 ou superior
* npm

---

## Backend

1. Acesse a pasta:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do backend com o conteúdo:

   ```env
   DATABASE_URL=file:./dev.db
   ```

4. Gere os arquivos do Prisma:

   ```bash
   npx prisma generate
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

O backend será executado em `http://localhost:3333`.

---

## Frontend

1. Acesse a pasta:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do frontend com o conteúdo:

   ```env
   VITE_API_URL=http://localhost:3333
   ```

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

O frontend será executado em `http://localhost:5173` (porta padrão do Vite).

---

## Resumo dos comandos

```bash
# Backend
cd backend
npm install
echo DATABASE_URL=file:./dev.db | Out-File -Encoding utf8 .env
npx prisma generate
npm run dev

# Frontend
cd frontend
npm install
echo VITE_API_URL=http://localhost:3333 | Out-File -Encoding utf8 .env
npm run dev
```
