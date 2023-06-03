# Project Planner - Server

## Overview
This repository contains the server-side code for the **Project Planner** project. It provides an API built with Express.js, utilizing PostgreSQL as the database and Sequelize as the ORM. The API allows users to create an account, perform authentication, and manage projects, clients, and tasks.

## Prerequisites
Before running the server, ensure you have the following installed:

- Node.js (version 18.13.0)
- PostgreSQL (version 3.3.4)

## Getting Started
1. Clone the repository:

```shell
git clone <repository_url> 
```
2. Install the dependencies:
```shell
cd server
npm install 
```
3. Set up the database:

- Create a PostgreSQL database.
- Update the database configuration in config/database.js to match your PostgreSQL credentials.

4. Run database migrations:
```shell
 npx sequelize-cli db:migrate
 ```
 5. Start the server:
 ```shell
 npm start
```
The server will run on http://localhost:3500.

## 2. Step 2: Install the dependencies
To install the project dependencies, navigate to the server directory and run the following command:
 ```shell
npm install
```
This will install all the required dependencies for the server.

## API Endpoints
The following are the available API endpoints:
- POST /api/users/signup: Create a new user account.
- POST /api/users/login: Authenticate the user and generate a JWT token.
- GET /api/projects: Get all projects.
- POST /api/projects: Create a new project.
- PUT /api/projects/ Update an existing project.
- DELETE /api/projects/ Delete a project.
- GET /api/clients: Get all clients.
- POST /api/clients: Create a new client.
- PUT /api/clients/ Update an existing client.
- DELETE /api/clients/:clientId: Delete a client.
- GET /api/tasks: Get all tasks.
- POST /api/tasks: Create a new task.
- PUT /api/tasks/:taskId: Update an existing task.
- DELETE /api/tasks/:taskId: Delete a task.

## Authentication
The API uses JSON Web Tokens (JWT) for authentication. To authenticate and authorize API requests, include the JWT token in the Authorization header as follows:
 ```shell
Authorization: Bearer <token>
```

## Logging
The server includes a logger function that logs notifications and errors. You can find the logs in the logs directory.

## Password Hashing
To securely store passwords, the server utilizes the Bcrypt package to hash the passwords before storing them in the database.

## Contributing
Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.




