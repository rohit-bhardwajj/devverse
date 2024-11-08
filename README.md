# DevVerse

DevVerse is a developer-focused platform that allows users to share and explore code snippets, tutorials, and technical articles. Built with MongoDB and React, it provides a collaborative environment for developers to learn and grow.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [License](#license)

## About

DevVerse is designed as a community platform where developers can connect and share their knowledge. It supports a range of content types like code snippets and blog posts, all stored and managed in MongoDB.

## Features

- **User Authentication**: Secure signup and login using JWT tokens and bcrypt for password hashing.
- **Snippet and Blog Posting**: Users can submit code snippets and blog posts.
- **Admin Verification**: Admin functionality to verify posts before they go live.
- **Like Feature**: Users can like blog posts and view their liked content on the homepage.
- **Image Upload**: Users can upload and display images alongside their posts.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **MongoDB**: NoSQL database for storing user data, blog posts, and other application data.
- **React**: Frontend framework for building user interfaces.
- **Express.js**: Web framework for handling API requests.
- **Node.js**: Backend runtime environment.
- **JWT**: Used for secure token-based authentication.
- **bcrypt**: For secure password hashing.

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/devverse.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd devverse
    ```

3. **Install dependencies for both frontend and backend**:
    - Backend:
      ```bash
      cd backend
      npm install
      ```
    - Frontend:
      ```bash
      cd ../frontend
      npm install
      ```

4. **Set up environment variables**: Create a `.env` file in the `backend` folder with the following variables:

    ```plaintext
    MONGO_URI=<Your MongoDB connection string>
    PORT=5000
    JWT_SECRET=<Your JWT secret>
    ```

5. **Start the development server**:
    - Backend:
      ```bash
      cd backend
      npm run dev
      ```
    - Frontend:
      ```bash
      cd ../frontend
      npm start
      ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.
