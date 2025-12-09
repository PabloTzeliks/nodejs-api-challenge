# Node.js API Challenge 🚀

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/PabloTzeliks/nodejs-api-challenge)
[![Status](https://img.shields.io/badge/status-in%20development-yellow.svg)](https://github.com/PabloTzeliks/nodejs-api-challenge)
[![Node.js](https://img.shields.io/badge/node.js-v22+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-lightgrey.svg)](https://opensource.org/licenses/ISC)

> 🌐 **[Documentação em Português](./README.md)**

## 📖 Description

A REST API developed in **Node.js v22+** for course management. This project was created as part of a technical challenge, implementing best practices in development with TypeScript, data validation, and modern architecture.

**⚠️ Initial Version (v0.1.0)** - This project is in constant evolution and new features will be added regularly.

## 👨‍💻 Author

**Pablo Tzeliks**

- GitHub: [@PabloTzeliks](https://github.com/PabloTzeliks)
- Repository: [nodejs-api-challenge](https://github.com/PabloTzeliks/nodejs-api-challenge)

## 🛠️ Tech Stack

This project uses the following technologies:

- **[Node.js](https://nodejs.org/)** v22+ - JavaScript Runtime
- **[TypeScript](https://www.typescriptlang.org/)** v5.9+ - JavaScript superset with static typing
- **[Fastify](https://fastify.dev/)** v5.6+ - High-performance web framework
- **[Drizzle ORM](https://orm.drizzle.team/)** v0.45+ - TypeScript-first ORM for SQL
- **[PostgreSQL](https://www.postgresql.org/)** 17 - Relational database
- **[Docker](https://www.docker.com/)** - Database containerization
- **[Pino](https://getpino.io/)** - High-performance logger

## 🚀 How to Run

### Prerequisites

- Node.js v22 or higher
- Docker and Docker Compose
- npm (package manager)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/challenge_db"
```

**Available variables:**
- `DATABASE_URL`: PostgreSQL database connection string

### Step 3: Start the Database with Docker

Run the command to start the PostgreSQL container:

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port `5432` with the following credentials:
- **User:** postgres
- **Password:** postgres
- **Database:** challenge_db

### Step 4: Run Database Migrations

Generate migrations (if needed):

```bash
npm run db:generate
```

Execute migrations to create tables:

```bash
npm run db:migrate
```

### Step 5: Start the Server

Start the server in development mode:

```bash
npm run dev
```

The server will be available at: **http://localhost:3333**

## 📚 API Documentation

### Base URL

```
http://localhost:3333
```

### Available Endpoints

#### 1. Create a New Course

Creates a new course in the system.

- **Method:** `POST`
- **URL:** `/courses`
- **Headers:**
  - `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "Introduction to TypeScript",
  "description": "Learn TypeScript fundamentals from scratch"
}
```

**Success Response (201 Created):**
```json
{
  "courseId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Title is required"
}
```

**Notes:**
- The `title` field is required
- The `description` field is optional
- The ID is automatically generated using UUID v4

---

#### 2. List All Courses

Returns a list of all registered courses.

- **Method:** `GET`
- **URL:** `/courses`

**Success Response (200 OK):**
```json
{
  "courses": [
    {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "title": "Introduction to TypeScript"
    },
    {
      "id": "a1b2c3d4-e5f6-4789-0abc-def123456789",
      "title": "Advanced Node.js"
    }
  ]
}
```

**Notes:**
- Returns only the `id` and `title` fields of each course
- Returns an empty array if there are no registered courses

---

#### 3. Get Course by ID

Returns the complete details of a specific course.

- **Method:** `GET`
- **URL:** `/courses/:id`
- **URL Parameters:**
  - `id` (UUID) - Course ID

**Request Example:**
```
GET /courses/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

**Success Response (200 OK):**
```json
{
  "course": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "title": "Introduction to TypeScript",
    "description": "Learn TypeScript fundamentals from scratch"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Course not found."
}
```

**Notes:**
- The ID must be a valid UUID
- Returns all course fields (id, title, description)

---

## 🗄️ Database

### `courses` Table Structure

The courses table has the following structure:

| Field         | Type      | Description                                  | Constraints         |
|---------------|-----------|----------------------------------------------|---------------------|
| `id`          | UUID      | Unique course identifier                     | PRIMARY KEY, AUTO   |
| `title`       | TEXT      | Course title                                 | NOT NULL, UNIQUE    |
| `description` | TEXT      | Detailed course description                  | NULL                |

**Features:**
- IDs are automatically generated using UUID v4 (`.defaultRandom()`)
- The title is unique in the system (cannot register two courses with the same title)
- The description is optional and can be null

### Schema (Drizzle ORM)

```typescript
export const courses = pgTable('courses', {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text(),
})
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start the server in watch mode with hot reload

# Database
npm run db:generate  # Generate database migrations
npm run db:migrate   # Execute migrations on the database
npm run db:studio    # Open Drizzle Studio to visualize the database

# Tests
npm test            # Run tests (not yet implemented)
```

## 📝 Development Notes

- The project uses Node.js v22+'s `--experimental-strip-types` feature to run TypeScript natively
- The `--watch` mode enables automatic hot reload during development
- The `.env` file is automatically loaded using `--env-file`
- Formatted logs with Pino Pretty for better readability

## 🔐 Security

- Environment variables for sensitive credentials
- Basic input validation implemented
- PostgreSQL with username and password authentication

## 🚧 Roadmap

- [ ] Implement data validation with Zod
- [ ] Add automated tests
- [ ] Implement authentication and authorization
- [ ] Add pagination to list endpoints
- [ ] Implement soft delete
- [ ] Add Swagger/OpenAPI documentation

## 📄 License

ISC

---

**Developed with ❤️ by Pablo Tzeliks**
