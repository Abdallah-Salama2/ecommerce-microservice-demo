# 🛒 Modern E-Commerce Microservices Storefront & Admin

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start%20%2F%20Router%20%2F%20Query-FF4154.svg)](https://tanstack.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.2-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF.svg?logo=vite)](https://vitejs.dev/)

> 🤖 **AI-Assisted Demo Project**: This project was developed with the assistance of AI as a production-ready, feature-rich demonstration frontend designed to interface with an **E-Commerce Microservices Architecture**. It serves as a modern blueprint for full-stack e-commerce experiences with type-safe routing, real-time inventory management, batch data fetching, and an enterprise backoffice dashboard.

---

## 🔗 Backend Microservices Architecture

This frontend is decoupled and built to communicate with a distributed microservices backend ecosystem or an API Gateway.

- **Backend Repository**: [🔗 Microservices Backend Repository](https://github.com/your-username-or-org/ecommerce-microservices-backend) *(Update with your repository URL)*
- **API Base Gateway**: Configured via `VITE_API_BASE_URL` (Defaults to `http://localhost/api`)

```
                        ┌───────────────────────────────┐
                        │      TanStack Start Client    │
                        │   (Storefront & Admin Portal) │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │    API Gateway / Reverse Proxy│
                        │        (VITE_API_BASE_URL)    │
                        └───┬───────┬───────┬───────┬───┘
                            │       │       │       │
      ┌─────────────────────┘       │       │       └─────────────────────┐
      ▼                             ▼       ▼                             ▼
┌──────────────┐             ┌─────────────┐ ┌──────────────┐     ┌──────────────┐
│  Auth & User │             │   Catalog   │ │  Inventory   │     │    Orders    │
│   Service    │             │   Service   │ │   Service    │     │   Service    │
│  (/api/auth) │             │(/api/prod..)│ │ (/api/stock) │     │(/api/orders) │
└──────────────┘             └──────┬──────┘ └──────────────┘     └──────────────┘
                                    │
                             ┌──────▼──────┐
                             │    Media    │
                             │   Service   │
                             │(/api/media) │
                             └─────────────┘
```

### Microservice Endpoints Consumed
| Service | Primary Endpoints | Responsibilities |
| :--- | :--- | :--- |
| **Auth & User Service** | `/api/auth/*`, `/api/users/*` | JWT authentication, silent refresh token rotation, user profiles, shipping addresses |
| **Catalog / Product Service** | `/api/products/*`, `/api/categories/*` | Paginated product browsing, category tree, filtering, search, slug details |
| **Media Service** | `/api/products/:id/images`, `/api/products/images/batch` | Image uploads, media storage, batch thumbnail resolver |
| **Inventory / Stock Service** | `/api/stock/batch`, `/api/products/:id/stock` | Batch real-time stock levels, low-stock alerts, stock delta/absolute updates |
| **Cart Service** | `/api/cart/*` | Server-side & client-side cart synchronization, item quantity mutations |
| **Order & Checkout Service** | `/api/orders/*`, `/api/checkout/*` | Multi-step checkout, order status lifecycle, invoice tracking, admin fulfillment |

---

## ✨ Features

### 🛍️ Customer Storefront
- **Modern Homepage & Showcase**: Dynamic hero sections, trending collections, and category highlights.
- **Product Catalog & Filtering**: Search bar, category filters, price sorting, and paginated navigation.
- **Dynamic Product Pages**: High-resolution image galleries, rich descriptions, dynamic stock badges, and quantity selectors.
- **Shopping Cart & Mini-Cart**: Slide-out mini-cart drawer and full cart view with real-time subtotal calculation.
- **Customer Wishlist**: Save favorite products for later purchase.
- **Multi-Step Checkout**: Address selection, shipping methods, payment summary, and instant validation.
- **Order Tracking & Confirmation**: Visual confirmation receipts with status tracking.
- **User Authentication**: Secure Login, Registration, Forgot Password, and Account Dashboard with order history.

### 🛡️ Admin Backoffice Dashboard
- **Role-Based Access Control**: Protected `/admin` routes accessible only by authenticated administrators.
- **Analytics Overview**: Store metrics, revenue stats, active customer counts, and recent order feeds.
- **Product Management (CRUD)**: Create new products, edit by ID or Slug, manage inventory thresholds, and upload product gallery media.
- **Inventory Control**: Live stock adjustments (batch, delta, and absolute stock modifications).
- **Order Management**: Filter orders by status (`pending`, `processing`, `shipped`, `delivered`, `cancelled`) and update fulfillment status.
- **Category Tree Management**: Create, edit, and organize product categories.
- **Customer Directory**: View customer profiles, order history, and contact information.

### ⚡ Architectural Highlights
- **TanStack Router**: 100% type-safe file-based routing and parameter validation.
- **TanStack Query v5**: Stale-while-revalidate caching, automatic query invalidation, and background synchronization.
- **Batching & Performance**: Specialized batch requests for thumbnails and stock to eliminate N+1 API overhead.
- **Resilient Auth Pipeline**: Automatic token refresh handling using request interception and retry queues.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) with [Nitro](https://nitro.unjs.io/) Server Engine
- **Core**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **State & Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest) & [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/), [Sonner Toasts](https://sonner.emilkowal.ski/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)

---

## 📁 Project Structure

```text
my-store/
├── public/                 # Static assets & public files
├── src/
│   ├── assets/             # Images, icons, and media
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Protected routes and role guards
│   │   ├── storefront/     # Storefront components (header, footer, cards, mini-cart)
│   │   └── ui/             # Radix-based UI primitives (buttons, dialogs, badges, inputs)
│   ├── hooks/              # Custom hooks & TanStack Query integrations (use-api.ts)
│   ├── lib/                # API client with token refresh & helper utilities
│   ├── routes/             # TanStack Start file-based routes
│   │   ├── __root.tsx      # Application root layout & query provider
│   │   ├── _storefront.*   # Customer storefront pages (home, shop, product, cart, checkout)
│   │   └── admin.*         # Protected admin dashboard pages & submodules
│   ├── store/              # Zustand global state (auth, session)
│   ├── styles.css          # Global Tailwind CSS styles and theme variables
│   └── types/              # Comprehensive TypeScript interfaces & API contracts
├── .env.example            # Sample environment variables
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite & TanStack plugin configurations
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher) or [Bun](https://bun.sh/)
- Running backend microservices instance (or mock API gateway)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/my-store.git
cd my-store
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` to point to your backend API Gateway:
```env
VITE_API_BASE_URL=http://localhost/api
```

### 3. Install Dependencies
```bash
# Using npm
npm install

# Or using Bun
bun install
```

### 4. Run Development Server
```bash
npm run dev
# or
bun run dev
```

The application will be running locally at `http://localhost:3000` (or the port specified in console output).

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 📄 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the application for production (SSR output with Nitro) |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint across the codebase |
| `npm run format` | Formats code with Prettier |

---

## 📄 License & Attribution

Distributed under the MIT License. See `LICENSE` for more information.

> *Note: This application was created as an AI-powered demo illustrating best practices for modern fullstack React applications connecting to microservices architectures.*
