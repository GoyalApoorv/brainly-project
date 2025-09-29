# 🧠 Brainly

Brainly is a full-stack content curation application designed to be a personal "second brain." It allows users to save, tag, and search for various types of content, such as articles, tweets, and videos, and share their entire collection with a single, public link.



## ✨ Key Features

* **User Authentication**: Secure user signup and sign-in using JSON Web Tokens (JWT).
* **Content Management**:
    * Add content from various sources, including YouTube links, Twitter links, and document uploads.
    * View all saved content in a clean, card-based interface with rich embeds.
    * Delete content items.
* **Tagging System**:
    * Add custom, comma-separated tags when creating content.
    * Tags are displayed on each content card.
* **Full-Text Search**: Instantly search through all your saved content by title.
* **Shareable Public Brain**:
    * Generate a unique, shareable link for your entire content collection with a single click.
    * A public, read-only page with a similar UI (Header, Sidebar, Search) for visitors.

## 💻 Tech Stack

The project is built with a modern, full-stack TypeScript architecture.

* **Frontend**:
    * **Framework**: React
    * **Language**: TypeScript
    * **Build Tool**: Vite
    * **Styling**: Tailwind CSS
    * **Routing**: React Router DOM
    * **API Communication**: Axios

* **Backend**:
    * **Framework**: Node.js with Express.js
    * **Language**: TypeScript
    * **Database**: MongoDB with Mongoose
    * **Authentication**: JSON Web Tokens (JWT)
    * **File Uploads**: Multer

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

* Node.js (v18 or later)
* npm / yarn
* MongoDB (either a local instance or a free cloud instance from MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/brainly.git](https://github.com/your-username/brainly.git)
    cd brainly
    ```

2.  **Install Backend Dependencies:**
    ```bash
    # Navigate to your backend folder
    cd backend 
    npm install
    ```

3.  **Configure Backend Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    DATABASE_URL="your_mongodb_connection_string"
    JWT_PASSWORD="your_super_secret_jwt_password"
    PORT=3000
    ```

4.  **Install Frontend Dependencies:**
    ```bash
    # Navigate to your frontend folder from the root
    cd ../frontend
    npm install
    ```

5.  **Configure Frontend Environment Variables:**
    Create a `.env` file in the `frontend` directory and add the following:
    ```env
    VITE_BACKEND_URL="http://localhost:3000"
    ```

### Running the Application

You will need two separate terminals to run both the frontend and backend servers.

1.  **Run the Backend Server:**
    ```bash
    # In the /backend directory
    npm run dev
    ```
    The server should be running on `http://localhost:3000`.

2.  **Run the Frontend Development Server:**
    ```bash
    # In the /frontend directory
    npm run dev
    ```
    The application should be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## 📝 API Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/signup` | Register a new user. |
| `POST` | `/api/v1/signin` | Log in a user and receive a JWT. |
| `GET`  | `/api/v1/content` | Get all content for the logged-in user. |
| `POST` | `/api/v1/content` | Create a new piece of link-based content with tags.|
| `POST` | `/api/v1/content/document` | Create content by uploading a file. |
| `DELETE`| `/api/v1/content/:id` | Delete a piece of content. |
| `POST` | `/api/v1/brain/share` | Create (`share:true`) or delete (`share:false`) the share link.|
| `GET`  | `/api/v1/brain/:shareLink`      | **Public:** Get the content for a given share hash.|