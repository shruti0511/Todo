# 📝 Todo App

This is simple Todo Application built with NodeJs, TypeScript, Express and MongoDB. It includes user Authentication using JWT, CRUD operation for TODO with Authorization and cron job to run background service.

## Features
- User Sign up & Login with JWT Authentication
- Protected Routes using Token
- CRUD operation to handle Todo items.
- Daily CRON job to set expired dueedate todos completed.


## Technologies and Libraries Used

- Node.js
- Express
- typesctipt
- MongoDB (mongoose) 
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- node-cron
- zod (validation schema)
 -cors

## Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/shruti0511/Todo.git
cd Todo
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

```bash
copy .env.example .env
```
#### 4. Start the Server (For Development)

```bash
npm run dev
```

#### 5. Build Application

```bash
npm run build
```
#### 6. Start the Server (For Production)

```bash
npm run start
```
## API Endpoints

### 1. Authentication
#### 1.1 User Registration
     POST /api/auth/register
  - Description : Register a new user.
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourPassword"
    }
    ```

#### 1.2 User Login
     POST /api/auth/login
  - Description : Log in and retrive token.
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourPassword"
    }
    ```
     
### 2. CRUD Todo (Require Auth Header)
#### 2.1 Get all todo items of authenticated user
     GET /api/todos
  - Description : Get all todos of the logged-in user.
#### 2.2 Get todo item by id
     GET /api/todos/:id
  - Description : Get todo item by its ID.
#### 2.3 Add todo item
     POST /api/todos
  - Description : Add New Todo item.
  - Body:
    ```json
    {
      "title":"Update documentation",
      "description":"Update the internal project documentation with recent API changes.",
      "dueDate":"2025-06-12"
    }
    ```
#### 2.4 Update todo item
     PUT /api/todos/:id
  - Description : Update Todo item by its ID.
  - Body:
    ```json
    {
      "completed": true
    }
    ```
#### 2.5 Delete todo item
     DELETE /api/todos/:id
  - Description : Delete Todo item by its ID.
    
All `/api/todos/*` routes require an `Authorization: Bearer <token>` header.

## Cron Job
A CRON job runs every day at midnight to automatically mark todos with past due dates as completed.



