# Simple Q&A Forum API - Milestone 2

A RESTful API for a Simple Q&A Forum application built with Node.js, Express, and Sequelize (SQLite). This project allows users to register, login, create discussion threads, and manage their own threads.

## Features
- **User Management**: Registration, login (with JWT authentication), and viewing user profiles.
- **CRUD Threads**: Create, Read, Update, and Delete discussion threads.
- **Authorization**: Users can only update and delete the threads they created.
- **Validation**: Handles empty inputs, duplicate emails, and unauthorized access.
- **Database Relations**: One-to-many relationship between Users and Threads.
- **API Documentation**: Interactive documentation using Swagger UI.

## Technologies Used
- Node.js & Express.js
- Sequelize (ORM) with SQLite (for easy local setup)
- Bcrypt.js (Password Hashing)
- JSON Web Token (JWT Authentication)
- Swagger (API Documentation)
- Dotenv (Environment Variables)

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/whtrianto/mileston2
   cd milestone2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   The `.env` file is already created in the project with the following configuration:
   ```env
   PORT=3000
   DB_DIALECT=sqlite
   DB_STORAGE=./database.sqlite
   JWT_SECRET=super_secret_key_123
   ```

4. **Run the application:**
   - For development (with auto-reload using nodemon):
     ```bash
     npm run dev
     ```
   - For production/normal start:
     ```bash
     npm start
     ```
   *Note: Upon starting the server for the first time, it will automatically create the SQLite database file (`database.sqlite`), sync the models, and insert the required Dummy Data for users and threads.*

## API Documentation (Swagger UI)
Once the server is running, open your browser and navigate to:
**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

From the Swagger UI, you can test all the available endpoints:
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in and receive a JWT token
- `GET /api/users/{id}` - View a user's profile
- `GET /api/threads` - List all threads
- `GET /api/threads/{id}` - View specific thread details
- `POST /api/threads` - Create a new thread (Requires Bearer Token)
- `GET /api/threads/my-threads` - List logged-in user's threads (Requires Bearer Token)
- `PUT /api/threads/{id}` - Update a thread (Requires Bearer Token, must be creator)
- `DELETE /api/threads/{id}` - Delete a thread (Requires Bearer Token, must be creator)

### How to use Bearer Token in Swagger:
1. Hit the `/api/auth/login` endpoint with valid credentials (e.g., `email: "johndoe@example.com"`, `password: "password123"`).
2. Copy the `token` from the response.
3. Scroll to the top of the Swagger page and click the green **"Authorize"** button.
4. Paste your token into the Value field and click Authorize.
5. You can now access protected endpoints!

## Deliverables Checklist
- [x] Language/Framework: Node.js (Express)
- [x] Database: SQLite
- [x] Environment Variables (.env) used
- [x] Authentication & Authorization implemented
- [x] Dummy data successfully seeded
- [x] Code appropriately commented in Indonesian

**To generate screenshots for your submission:**
Open the Swagger UI (`http://localhost:3000/api-docs`), execute tests for each endpoint (both success and error scenarios), and take screenshots demonstrating the Request URL, Method, Body/Headers, and the Response Status Code & Body.

## Backend Screenshots
Silakan letakkan screenshot pengujian API (melalui Swagger atau Postman) di folder `screenshots/` dan tautkan di bawah ini:

### 1. Registrasi Pengguna (`POST /api/auth/register`)
![Screenshot Registrasi](./screenshots/register.png)

### 2. Login Pengguna (`POST /api/auth/login`)
![Screenshot Login](./screenshots/login.png)

### 3. Lihat Profil User (`GET /api/users/{id}`)
![Screenshot User Profile](./screenshots/user_profile.png)

### 4. Daftar Semua Thread (`GET /api/threads`)
![Screenshot List Threads](./screenshots/threads_list.png)

### 5. Detail Thread (`GET /api/threads/{id}`)
![Screenshot Thread Detail](./screenshots/thread_detail.png)

### 6. Membuat Thread Baru (`POST /api/threads`)
![Screenshot Create Thread](./screenshots/create_thread.png)

### 7. Update Thread (`PUT /api/threads/{id}`)
![Screenshot Update Thread](./screenshots/update_thread.png)

### 8. Hapus Thread (`DELETE /api/threads/{id}`)
![Screenshot Delete Thread](./screenshots/delete_thread.png)