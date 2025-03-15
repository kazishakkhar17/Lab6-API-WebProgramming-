# Lab6-API-WebProgramming-

Project Overview

This project involves developing a backend API and integrating it with a frontend application. The backend is built using Node.js and Express, while MongoDB is used for the database. The frontend is developed with React.

Features

RESTful API endpoints

CRUD operations for user management

CORS support for cross-origin requests

MongoDB integration

WebSocket for real-time communication

Technologies Used

Node.js

Express.js

MongoDB

React.js

Axios

Nodemon

CORS

Installation Guide

Clone the repository:

git clone <repository_url>

Navigate to the project directory:

cd Lab6

Install backend dependencies:

cd Backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Running the Application

Start the backend server:

cd Backend
npm run dev

Start the frontend server:

cd ../frontend
npm start

The backend server will run on localhost:5000, and the frontend will be accessible at localhost:3000.

API Endpoints

Method

Endpoint

Description

GET

/api/users

Fetch all users

POST

/api/users

Add a new user

PUT

/api/users/:id

Update user data

DELETE

/api/users/:id

Delete a user

Troubleshooting

Address in use error:

Identify the process using the port:

lsof -i :5000

Kill the process:

kill -9 <process_id>

MongoDB connection error:

Ensure MongoDB is running locally or update the connection string in index.js.

CORS Error:

Ensure the CORS middleware is properly configured in the backend.

Contributors

Kazi Shakkhar Rahman
