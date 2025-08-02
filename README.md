# MERN Todo App with Authentication

This is a full-stack **MERN** (MongoDB, Express.js, React, Node.js) todo application. It features user authentication, allowing users to register, log in, and manage their own private task lists.

## 🚀 Features

- **Authentication**: Secure user login and registration using **JWT**.
- **CRUD**: Users can **create**, **read**, **update**, and **delete** their todos.
- **Personalized Lists**: Each user has their own dedicated todo list.
- **Modern UI**: Built with **React** and styled using **Tailwind CSS**.

## 📸 Page Views

#### Register

Users can create a new account on the register page.
![register page](./screenshots/register_page.png)

#### Login

Existing users can log in to access their todos and profile on the login page.
![login page](./screenshots/login_page.png)

#### Profile

Once logged in, users can view their profile information on the profile page.
![profile page](./screenshots/profile_page.png)

#### Home

The home page displays the user's personal list of todo tasks. This page is protected and requires login.
![home page](./screenshots/home_page.png)

## 🛠️ Tech Stack

### Backend

- **Node.js**: Runtime environment.
- **Express.js**: API framework.
- **TypeScript**: Statically typed JavaScript.
- **Mongoose**: MongoDB object modeling.
- **bcrypt**: Password hashing.
- **JWT**: For authentication.

### Frontend

- **React**: UI library.
- **Vite**: Build tool.
- **React Router Dom**: Client-side routing.
- **Axios**: HTTP client.
- **React Query**: Server-state management.
- **Tailwind CSS**: Utility-first styling.

## ⚙️ Getting Started

To get the project running on your local machine, follow these steps.

### Prerequisites

- **Node.js**
- **MongoDB** (local or cloud instance)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/eslam-dv/mern-todo-app.git
    cd mern-todo-app
    ```

2.  **Backend setup**:

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file with your credentials:

    ```env
    NODE_ENV=development
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    APP_ORIGIN=http://localhost:5173
    PORT=your_backend_port # defaults to 3001
    ```

3.  **Frontend setup**:

    ```bash
    cd ../frontend
    npm install
    ```

    Create a `.env` file with the API URL:

    ```env
    VITE_API_URL=http://localhost:3001
    ```

## ▶️ Running the App

Run the backend and frontend in separate terminals.

**Backend**:

```bash
cd backend
npm run dev
```

**Frontend**:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## 📦 Deployment

### Production Build

**Backend**:

```bash
cd backend
npm run build
node dist/index.js
```

**Frontend**:

```bash
cd frontend
npm run build
```

This command creates a `dist` folder with the optimized files for deployment on a static hosting service.
