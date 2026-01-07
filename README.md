# Model Portfolio (React + TypeScript + Firebase)

A simple, responsive **model portfolio** web application built with **React**, **TypeScript**, and **Vite**, using **Firebase** for authentication and data storage. The app includes a protected admin area at `/admin` where authenticated users can update portfolio data. The live site is hosted on Netlify: <https://waviolaa.netlify.app>

---

## 🚀 Features

- Public site showing About, Portfolios, Experience, Contact, and more
- Admin panel at `/admin` for managing entries (achievements, portfolios, clients, digitals, languages, personal info)
- Firebase Authentication for admin login
- Data persisted in Firebase (Firestore) and assets via Firebase Storage
- Smooth UI animations using Motion (motion.dev / Motion One)
- Built with React + TypeScript + Vite, styled using component-based UI

---

## 🔧 Tech Stack

- React
- TypeScript
- Vite
- Motion (motion.dev / Motion One)
- Firebase (Auth, Firestore)
- Deployed to Netlify

---

## 💻 Local Development

1. Install dependencies

```bash
npm install
```

1. Create a `.env.local` file in the project root and add your Firebase keys (example values below):

```env

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```

> The app reads these variables from `import.meta.env` (see `src/lib/firebase.ts`).

1. Run the dev server

```bash
npm run dev
```

Open <http://localhost:5173> to view locally.

---

## 🔒 Admin / Authentication

- Visit `/admin` to access the admin interface.
- Admin access requires signing in with Firebase Auth.
- Admin actions update Firestore documents used by the public site.

---

## 📦 Build & Deploy

Build the production files:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The site is deployed to Netlify at: <https://waviolaa.netlify.app>

---

## License

MIT

---
