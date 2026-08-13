# APVRS 2025 Kiosk App

Interactive event kiosk platform for browsing e-posters and surgical video entries during the APVRS 2025 event.

## Overview

This project is a full-stack kiosk application with a portrait-oriented React frontend, Node.js / Express backend, and MySQL database. It is designed for public event screens where attendees can browse categories, search entries, and open poster or video content through a simple touch-friendly interface.

## What This Project Demonstrates

- Full-stack JavaScript application structure
- React screen-based kiosk flow
- REST API development with Express
- MySQL-backed data access
- Searchable event entry records
- PDF, image, and video media viewing
- Idle timer and screensaver behavior for public kiosk usage
- API validation, sanitization, rate limiting, and logging

## Tech Stack

### Frontend

- React
- Axios
- Lucide React
- CSS / responsive portrait layout

### Backend

- Node.js
- Express
- MySQL2
- Express Validator
- Express Rate Limit
- Validator
- Winston
- Dotenv

### Database

- MySQL

## Main Features

- Welcome screen for event kiosk users
- Organization and menu selection
- Subspecialty/category browsing
- Search by title, author, entry code, and remarks
- Entry list view
- PDF/image poster viewer
- Video viewer
- Idle timeout handling
- Screensaver mode
- Backend health check endpoint
- API routes for organizations, menus, subspecialties, and entries

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
```

## API Endpoints

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

### 1. Clone the repository

```bash
git clone https://github.com/isplank/apvrs2025-kiosk-app.git
cd apvrs2025-kiosk-app
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file from your local environment values:

```text
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_CONNECTION_LIMIT=10
```

Start the backend:

```bash
npm run dev
```

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

The backend runs at:

```text
http://localhost:3001
```

## Environment and Security Notes

Do not commit real `.env` files, database credentials, production media, private event records, or SQL dumps containing sensitive data.

Before making the repository public, confirm that screenshots, sample records, and media files are safe to share.

Remove credential screenshots such as `sql_user.png` before using this repository as a public portfolio project.

## Suggested Portfolio Screenshots

- Welcome screen
- Menu screen
- Subspecialty/category screen
- Searchable entries screen
- PDF/image poster viewer
- Video viewer
- Screensaver screen

## Roadmap

- Keep `.env.example` files sanitized
- Add database schema documentation
- Add sample seed data for portfolio demos
- Add screenshot gallery
- Remove credential screenshots and rotate any exposed local database passwords
- Add admin upload workflow
- Add automated tests for API routes and frontend components
- Add production deployment notes

## Portfolio Summary

The APVRS 2025 Kiosk App shows my ability to build a real event-facing application with a clear user flow, backend API integration, database-driven records, media handling, and practical kiosk behavior for public use.
