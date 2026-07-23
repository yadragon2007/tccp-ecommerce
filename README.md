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
dotenv
```

---

## 4. Configure environment variables

Copy the example env file and fill in your own values:

```bash
cp .env.example .env
```




# TCCD E-Commerce Backend — API Endpoints Reference

Base URL: `http://localhost:PORT/api`
Auth: JWT stored in an `httpOnly` cookie (set on login, cleared on logout). No `Authorization` header required — the browser/client sends the cookie automatically.

---

## 1. Auth — `/api/auth`

| Method | Route | Auth | Roles | Usage |
|---|---|---|---|---|
| POST | `/api/auth/signup` | Public | — | Register a new customer account. Body: `{ name, email, password, phone?, address? }`. Creates a `User` with role forced to `customer` (never client-settable). Returns the created user (no password hash) and sets the JWT cookie. |
| POST | `/api/auth/login` | Public | — | Authenticate with `{ email, password }`. Verifies password hash, issues JWT (`{ sub, role }`), sets it as an `httpOnly` cookie. Returns basic user info. |
| POST | `/api/auth/logout` | Authenticated | any | Clears the JWT cookie, ending the session. No body required. |

---

## 2. Users — `/api/users`

| Method | Route | Auth | Roles | Usage |
|---|---|---|---|---|
| GET | `/api/users` | Authenticated | any (self) | Returns the profile of the currently logged-in user (identified via `req.user` from the JWT — not by an `:id` param). |
| PATCH | `/api/users` | Authenticated | any (self) | Updates the logged-in user's own profile. Body: any subset of `{ name, phone, address }`. Email/password/role changes are out of scope here (or require separate, more guarded flows). |

---

## 3. Products — `/api/products`

| Method | Route | Auth | Roles | Usage |
|---|---|---|---|---|
| GET | `/api/products` | Public | — | Paginated product list. Query: `?page=1&limit=20&category=<categoryId>`. Returns `{ status, data: [...], meta: { page, limit, totalItems, totalPages } }`. |
| GET | `/api/products/:id` | Public | — | Fetch a single product by id. 404 if not found. |
| POST | `/api/products` | Authenticated | `admin` | Create a product. Body: `{ name, description?, price, stock, categoryId, images? }`. Validated via `createProductValidator`. |
| PATCH | `/api/products/:id` | Authenticated | `admin` | Update any subset of product fields. Same validator as create (fields optional where sensible). |
| DELETE | `/api/products/:id` | Authenticated | `admin` | Delete a product by id. |

---

## 4. Categories — `/api/categories`

| Method | Route | Auth | Roles | Usage |
|---|---|---|---|---|
| GET | `/api/categories` | Public | — | Paginated category list. Query: `?page=1&limit=20`. |
| GET | `/api/categories/:id` | Public | — | Fetch a single category by id. |
| POST | `/api/categories` | Authenticated | `admin` | Create a category. Body: `{ name, description? }` (`slug` typically auto-generated from `name`). |
| PATCH | `/api/categories/:id` | Authenticated | `admin` | Update a category's fields. |
| DELETE | `/api/categories/:id` | Authenticated | `admin` | Delete a category by id. |

---

## 5. Cart — `/api/cart`

| Method | Route | Auth | Roles | Usage |
|---|---|---|---|---|
| POST | `/api/cart` | Authenticated | any (self) | Creates a cart for the logged-in user (`userId` unique-indexed, so this is idempotent — calling it twice won't create a duplicate). |
| DELETE | `/api/cart` | Authenticated | any (self, ownership-checked) | Deletes the logged-in user's own cart. Service layer verifies `cart.userId === req.user.id` before deleting; 403 otherwise. |

---

## 6. Cart Items — `/api/cartItems`

| Method | Route | Auth | Roles | Usage |
|---|---|---|---|---|
| GET | `/api/cartItems/:cartId` | Authenticated | any (ownership-checked) | Paginated list of items in the given cart. Service confirms the cart belongs to `req.user.id` before returning anything. |
| POST | `/api/cartItems/:cartId` | Authenticated | any (ownership-checked) | Adds an item to the specified cart. Body: `{ productId, quantity }`. Server looks up the product's current price and stores it as `priceAtAdd` (snapshot, immune to later price changes). |
| GET | `/api/cartItems/:cartItemId` | Authenticated | any (ownership-checked) | Fetch a single cart item by its own id. Service checks the parent cart's ownership. |
| PATCH | `/api/cartItems/:cartItemId` | Authenticated | any (ownership-checked) | Update a cart item, typically `{ quantity }`. Ownership re-checked; may re-validate stock. |

---

## Notes

- **"Ownership-checked"** means the role gate (`authorize`) only confirms the user is authenticated with an allowed role (any logged-in user) — the actual "is this yours?" check happens in the service layer against `req.user.id`, and fails with `403 Forbidden` if it doesn't match.
