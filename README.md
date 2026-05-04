# AI Chat Application

Full-stack AI chat application for Assignment 1.

## Technologies

- React + Vite
- Tailwind CSS
- ASP.NET Core Web API
- Cookie-based authentication
- Google Gemini API

## Features

- Register and log in
- HTTP-only cookie authentication
- Authenticated AI chat
- Chat sidebar for local chat sessions
- Progressive typing effect in the chat UI

## Setup

Run the backend:

```powershell
npm run backend
```

Run the frontend in another terminal:

```powershell
npm run dev
```

Open the frontend URL shown by Vite, usually `http://localhost:5173`.

## API

The frontend calls `http://localhost:5146/api`.

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `POST /api/chat/send`

## AI API

Google Gemini is configured in `backend/appsettings.json`.

## Deployment

You can deploy this demo without a database. Users are stored in backend memory, so accounts reset when the backend restarts.

Recommended simple setup:

1. Deploy `backend` as an ASP.NET Core web service on Render or Azure App Service.
2. Deploy the React frontend on Vercel or Netlify.
3. Set frontend environment variable:

   ```text
   VITE_API_URL=https://YOUR-BACKEND-URL/api
   ```

4. Set backend environment variables:

   ```text
   FrontendUrl=https://YOUR-FRONTEND-URL
   Gemini__ApiKey=YOUR_GEMINI_API_KEY
   Gemini__Model=gemini-flash-lite-latest
   ```

For local development, the app still uses:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5146`
- API base: `http://localhost:5146/api`
