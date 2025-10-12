# Patient Registration Application

Full-stack application for patient registration with email notifications.

## Tech Stack

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

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ligthit-challenge
```

2. Start the application with Docker
```bash
docker-compose up -d
```

3. Run database migrations
```bash
docker-compose exec backend npm run prisma:migrate
```

4. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Mailtrap: Check your Mailtrap inbox for confirmation emails

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

## Features

### Backend
- ✅ Patient registration API with validation
- ✅ Unique email validation
- ✅ Document photo upload (JPG only)
- ✅ Asynchronous email notifications
- ✅ PostgreSQL database with Prisma ORM
- ✅ Docker containerization

### Frontend
- ✅ Patient list with expandable cards
- ✅ Add patient form with validation
- ✅ Drag & drop for document photos
- ✅ Country code + phone number fields
- ✅ Gmail-only email validation
- ✅ Animated error messages
- ✅ Modal for success/error states
- ✅ Auto-refresh on successful registration
- ✅ Loading and empty states
- ✅ Dark/Light theme support

## API Endpoints

### GET /api/patients
Returns all registered patients.

### POST /api/patients
Registers a new patient.

**Body (multipart/form-data):**
- `fullName`: string (letters only)
- `email`: string (must be @gmail.com)
- `countryCode`: string (e.g., +598)
- `phoneNumber`: string
- `documentPhoto`: file (JPG only)

## Environment Variables

Create `.env` files in both `backend` and `frontend` directories:

### Backend `.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/patients_db"
REDIS_URL="redis://localhost:6379"
MAILTRAP_HOST="sandbox.smtp.mailtrap.io"
MAILTRAP_PORT="2525"
MAILTRAP_USER="your_mailtrap_user"
MAILTRAP_PASS="your_mailtrap_password"
PORT=3000
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:3000
```

## Future Enhancements

The application is designed with modularity in mind to support:
- SMS notifications (planned for 2 months)
- Additional notification channels
- Extended patient information

## License

MIT
