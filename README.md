# Grit to Grace Mentorship — Full MERN Stack Website

**Faith-Rooted. Veteran-Owned. Community-Focused.**

A complete MERN (MongoDB, Express, React, Node.js) web application with admin panel built for Grit to Grace Mentorship LLC.

---

## 📁 Project Structure

```
grit-to-grace/
├── backend/          → Node.js + Express API
└── frontend/         → React (Vite) + Tailwind CSS
    └── src/admin/    → Admin Panel (inside frontend)
```

---

## ⚙️ Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier is fine)
- Cloudinary account (free tier)

---

## 🚀 Setup Instructions

### Step 1 — Clone or Extract the Project

```bash
cd grit-to-grace
```

---

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Fill in your `.env` values:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/grit-to-grace
JWT_SECRET=your_super_secret_key_here_make_it_long
JWT_EXPIRE=30d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_EMAIL=admin@grit-to-grace.com
ADMIN_PASSWORD=YourSecurePassword123
```

Start the backend:

```bash
npm run dev       # development (with nodemon)
npm start         # production
```

**Create your first admin account** (run once only):

```bash
curl -X POST http://localhost:5000/api/auth/setup
```

Or visit: `http://localhost:5000/api/auth/setup` in your browser.

---

### Step 3 — Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend runs at: `http://localhost:5000`

---

## 🌐 Pages

### Public Website
| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/services` | Our Services |
| `/pricing` | Pricing |
| `/testimonials` | Testimonials |
| `/contact` | Contact Form |

### Admin Panel
| Route | Page |
|---|---|
| `/admin/login` | Admin Login |
| `/admin` | Dashboard |
| `/admin/leads` | Leads & Contacts |
| `/admin/testimonials` | Testimonials Manager |
| `/admin/settings` | Site Settings |

---

## 🔒 API Endpoints

### Auth
- `POST /api/auth/setup` — Create first admin (run once)
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current admin (protected)

### Testimonials
- `GET /api/testimonials` — Public list (active only)
- `GET /api/testimonials/all` — Admin list (all)
- `POST /api/testimonials` — Create (admin)
- `PUT /api/testimonials/:id` — Update (admin)
- `DELETE /api/testimonials/:id` — Delete (admin)

### Contact / Leads
- `POST /api/contact` — Submit form (public)
- `GET /api/contact` — All leads (admin)
- `PUT /api/contact/:id` — Update status/notes (admin)
- `DELETE /api/contact/:id` — Delete (admin)

### Settings
- `GET /api/settings` — All settings (public)
- `PUT /api/settings` — Bulk update (admin)

### Upload
- `POST /api/upload/image` — Upload image to Cloudinary (admin)

---

## ☁️ Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. From your dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret
3. Add them to your backend `.env` file

Images are stored in folders:
- `grit-to-grace/testimonials` — Testimonial photos
- `grit-to-grace/hero` — Hero section images
- `grit-to-grace/logo` — Site logo

---

## 🏗️ Production Deployment

### Backend (Render / Railway / VPS)

1. Push your backend folder to GitHub
2. Set all environment variables in your hosting platform
3. Set start command: `node server.js`
4. Add your frontend URL to `CLIENT_URL` in `.env`

### Frontend (Vercel / Netlify)

1. Update `vite.config.js` proxy OR set `VITE_API_URL` env var
2. In `src/services/api.js`, change baseURL:
   ```js
   baseURL: import.meta.env.VITE_API_URL || '/api'
   ```
3. Deploy frontend to Vercel/Netlify
4. Set env variable: `VITE_API_URL=https://your-backend.render.com/api`

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|---|---|---|
| Navy | `#1a2b6d` | Headers, navbar, footer |
| Crimson | `#C8102E` | Accents, CTAs, highlights |
| Gold | `#f5c842` | Star ratings |
| White | `#ffffff` | Backgrounds, text on dark |

Fonts: **Oswald** (headings) + **Inter** (body) + **Dancing Script** (taglines)

---

## 📌 Logo Placement

Place the client logo at:
```
frontend/public/images/logo.png
```

The navbar and footer will automatically use it.

---

## 📞 Client Info

- **Name:** David Arenas
- **Organization:** Grit to Grace Mentorship LLC
- **Phone:** 832-856-2254
- **Email:** GTGMentorship@gmail.com
- **Facebook:** https://www.facebook.com/GTGMentorship

---

## 🛠️ Built by BizzOne Digital
