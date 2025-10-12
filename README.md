# 🏥 Patient Registration System

A modern, full-stack application for patient registration with real-time email notifications, built with TypeScript, React, and Node.js.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Node](https://img.shields.io/badge/Node-20-green)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Development](#development)

## ✨ Features

### Backend
- ✅ RESTful API with Express + TypeScript
- ✅ Patient registration with comprehensive validation
- ✅ Unique email constraint enforcement
- ✅ Document photo upload (JPG only, max 5MB)
- ✅ Asynchronous email notifications via Bull queue
- ✅ PostgreSQL database with Prisma ORM
- ✅ Redis for job queue management
- ✅ Full Docker containerization

### Frontend
- ✅ Modern React UI with TypeScript
- ✅ Patient list with expandable cards and animations
- ✅ Registration form with real-time validation
- ✅ Drag & drop file upload
- ✅ Country code + phone number input
- ✅ Gmail-only email validation
- ✅ Success/Error modals with animations
- ✅ Auto-refresh on successful registration
- ✅ Dark/Light theme toggle
- ✅ Internationalization (English/Spanish)
- ✅ Responsive design with sticky footer

## 🛠 Tech Stack

### Backend
- Node.js + Express + TypeScript
- PostgreSQL (database)
- Prisma ORM
- Bull (job queue for async emails)
- Nodemailer + Mailtrap (email service)
- Multer (file uploads)

### Frontend
- React + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Framer Motion (animations)
- Radix UI (primitives)
- React Hook Form (form validation)

### DevOps
- Docker + Docker Compose
- ESLint + Prettier

## Project Structure

```
.
├── backend/          # Node.js API
├── frontend/         # React application
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- [Docker](https://www.docker.com/get-started) & Docker Compose
- [Node.js 20+](https://nodejs.org/) (optional, for local development)
- [Mailtrap Account](https://mailtrap.io) (free, for email testing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ligthit-challenge
```

2. **Configure environment variables**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your Mailtrap credentials:
```env
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
```

3. **Start the application**
```bash
docker-compose up -d
```

4. **Run database migrations**
```bash
docker-compose exec backend npx prisma migrate deploy
```

5. **Access the application**
- 🌐 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:3000
- 📧 **Mailtrap**: Check your inbox for confirmation emails
- 🗄️ **PostgreSQL**: localhost:5432 (user: postgres, password: postgres)
- 🔴 **Redis**: localhost:6379

### Development

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
ligthit-challenge/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── config/                # Configuration files
│   │   ├── controllers/           # Route controllers
│   │   ├── middleware/            # Express middleware
│   │   ├── queues/                # Bull job queues
│   │   ├── routes/                # API routes
│   │   ├── services/              # Business logic
│   │   ├── validators/            # Request validation
│   │   └── index.ts               # Entry point
│   ├── uploads/                   # Uploaded files
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── features/          # Feature components
│   │   │   └── ui/                # Reusable UI components
│   │   ├── contexts/              # React contexts
│   │   ├── hooks/                 # Custom hooks
│   │   ├── i18n/                  # Translations
│   │   ├── lib/                   # API client
│   │   ├── styles/                # Global styles
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
├── docs/                          # Documentation
├── docker-compose.yml
├── .env.example
└── README.md
```

## 📡 API Documentation

### `GET /api/patients`

**Description:** Retrieve all registered patients

**Response:**
```json
[
  {
    "id": "uuid",
    "fullName": "John Doe",
    "email": "john@gmail.com",
    "countryCode": "+1",
    "phoneNumber": "5551234567",
    "documentPhoto": "/uploads/filename.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `POST /api/patients`

**Description:** Register a new patient

**Content-Type:** `multipart/form-data`

**Body:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `fullName` | string | Yes | Letters and spaces only |
| `email` | string | Yes | Must be @gmail.com, unique |
| `countryCode` | string | Yes | Format: +XXX |
| `phoneNumber` | string | Yes | 6-15 digits |
| `documentPhoto` | file | Yes | JPG only, max 5MB |

**Success Response (201):**
```json
{
  "id": "uuid",
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "countryCode": "+1",
  "phoneNumber": "5551234567",
  "documentPhoto": "/uploads/filename.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response (400):**
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

## 🔧 Environment Variables

See `.env.example` files for required environment variables.

**Root `.env`:**
- `MAILTRAP_HOST` - Mailtrap SMTP host
- `MAILTRAP_PORT` - Mailtrap SMTP port
- `MAILTRAP_USER` - Mailtrap username
- `MAILTRAP_PASS` - Mailtrap password

## 🧪 Testing

Access Mailtrap inbox to verify email notifications are sent after patient registration.

## 🚀 Deployment

The application is containerized and ready for deployment to any Docker-compatible platform (AWS ECS, Google Cloud Run, DigitalOcean, etc.).

## 📝 License

MIT
