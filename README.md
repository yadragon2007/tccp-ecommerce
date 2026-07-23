# Installation Guide — TCCD E-Commerce Backend API

This guide walks you through setting up and running the TCCD E-Commerce backend locally.

Repo: https://github.com/yadragon2007/tccp-ecommerce

---

## 1. Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Notes |
|---|---|---|
| Node.js | v24.15.0 | Check with `node -v` |
| npm | 11.12.1 | Ships with Node.js — check with `npm -v` |
| MongoDB | v6 or later | Local install, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster |
| Git | any recent version | To clone the repo |

Optional but recommended:
- **Postman** or **Insomnia** — for exercising the API endpoints (cookies-based JWT auth is easier to test with a client that persists cookies).
- **MongoDB Compass** — GUI for inspecting your local/Atlas database.

---

## 2. Clone the repository

```bash
git clone https://github.com/yadragon2007/tccp-ecommerce.git
cd tccp-ecommerce
```

---

## 3. Install dependencies

```bash
npm install
```

Core dependencies expected in `package.json`:

```
express
mongoose
jsonwebtoken
cookie-parser
bcryptjs
express-validator
helmet
cors
express-mongo-sanitize
express-rate-limit
morgan
winston
dotenv
```

---

## 4. Configure environment variables

Copy the example env file and fill in your own values:

```bash
cp .env.example .env
```
