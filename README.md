# APVRS 2025 Kiosk App

Full-stack event kiosk application built with **React**, **Node.js / Express**, and **MySQL**.

This project demonstrates how I design and build practical, database-driven systems for real operational use: clear user flows, searchable records, media viewing, backend APIs, validation, logging, and deployment-ready configuration.

## Portfolio Value

This repository is presented as a public, sanitized portfolio version of an event kiosk system. It shows my ability to:

- Build a full-stack application with separated frontend and backend layers.
- Translate event browsing workflows into a touch-friendly kiosk interface.
- Connect a React UI to REST API endpoints and MySQL records.
- Handle media-based records such as poster images, PDFs, videos, and audio.
- Add public-kiosk behavior such as idle timeout and screensaver flow.
- Prepare code for GitHub review without committing credentials or private records.

## Features

- Portrait-style kiosk interface for public event screens
- Welcome, menu, subspecialty/category, and entries screens
- Search by title, author, entry code, and remarks
- Poster, PDF, video, and audio media viewer components
- Idle timer that returns the kiosk to the home screen
- Screensaver fallback screen for inactive sessions
- REST API for organizations, menus, subspecialties, and entries
- MySQL connection pooling
- API validation, sanitization, rate limiting, and centralized error handling
- Winston-based backend logging

## Architecture

```text
React kiosk frontend
  -> API service layer with Axios
  -> Express REST API
  -> Controller and model layer
  -> MySQL database
```

The frontend owns the kiosk navigation and media viewing experience. The backend exposes structured API endpoints for lookup data and event entries. MySQL stores the event records used by the kiosk.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Axios, Lucide React |
| Backend | Node.js, Express |
| Database | MySQL |
| API Safety | Express Validator, input sanitization, rate limiting |
| Logging | Winston |
| Configuration | Dotenv, `.env.example` files |

## Project Structure

```text
apvrs2025-kiosk-app/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      server.js
  frontend/
    public/
    src/
      components/
      config/
      context/
      hooks/
      pages/
      services/
      utils/
  README.md
  package.json
```

## API Summary

```text
GET /api/health
GET /api/organizations
GET /api/organizations/:code/menus
GET /api/menus
GET /api/subspecialties
GET /api/entries
GET /api/entries/:id
GET /api/search
```

## Local Setup

### Prerequisites

- Node.js
- npm
- MySQL

### 1. Clone the repository

```bash
git clone https://github.com/isplank/apvrs2025-kiosk-app.git
cd apvrs2025-kiosk-app
```

### 2. Install dependencies

`node_modules` is intentionally not uploaded to GitHub. Install dependencies locally:

```bash
npm run install:all
```

Or install each app separately:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3. Configure environment variables

Create `backend/.env` using `backend/.env.example` as a guide:

```text
NODE_ENV=development
PORT=3001
HOST=0.0.0.0
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=event_kiosk
DB_CONNECTION_LIMIT=10
CORS_ORIGIN=http://localhost:3000
```

Create `frontend/.env` using `frontend/.env.example` as a guide:

```text
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000
REACT_APP_IDLE_TIMEOUT=300000
REACT_APP_KIOSK_WIDTH=1080
REACT_APP_KIOSK_HEIGHT=1920
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=false
```

### 4. Run the backend

```bash
npm run dev:backend
```

Backend URL:

```text
http://localhost:3001
```

Health check:

```text
http://localhost:3001/api/health
```

### 5. Run the frontend

Open another terminal:

```bash
npm run dev:frontend
```

Frontend URL:

```text
http://localhost:3000
```

## Screenshots

This public portfolio repository uses sanitized demo presentation. Add safe screenshots here after replacing any private event records, credentials, or restricted branding.

| Screen | Preview |
| --- | --- |
| Welcome screen | Add sanitized screenshot |
| Menu selection | Add sanitized screenshot |
| Category selection | Add sanitized screenshot |
| Searchable entries | Add sanitized screenshot |
| Poster/PDF viewer | Add sanitized screenshot |
| Video viewer | Add sanitized screenshot |

## Public Repository Safety

The repository intentionally excludes:

- `node_modules/`
- `.env` files
- logs
- uploads
- build output
- database dumps
- screenshots or media containing private records
- credential screenshots

Use `.env.example` files for setup documentation. Never commit real database credentials, production records, client data, or private media.

## Roadmap

- Add sanitized demo seed data
- Add database schema documentation
- Add a screenshot gallery with safe demo records
- Add admin upload workflow
- Add API route tests
- Add frontend component tests
- Add deployment notes

## About This Project

This project is part of my software development portfolio as a **Business Systems / Full-Stack Developer**. It highlights practical application development for real users, structured records, event operations, and database-backed workflows.
