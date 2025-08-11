# Notes App (React + Express + MongoDB)

## Overview
Simple notes app supporting bullet notes and checklist notes. Each note is one format only.

## Tech
- Frontend: React (Create React App) + CSS
- Backend: Node.js + Express + MongoDB (Mongoose)

## Run locally
1. Backend
   - cd backend
   - cp .env.example .env (fill MONGO_URI)
   - npm install
   - npm run dev

2. Frontend
   - cd frontend
   - create .env with REACT_APP_API_URL=http://localhost:5000/api
   - npm install
   - npm start

## API
- GET /api/notes
- GET /api/notes/:id
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id


