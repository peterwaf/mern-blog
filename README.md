MERN Blog Application
A full-stack blog application built using the MERN stack (MongoDB, Express.js, React, and Node.js). This project allows users to create, read, update, and delete blog posts, providing a seamless blogging experience.

Features
User Authentication: Secure user registration and login functionality.

Create Blog Posts: Users can create and publish new blog posts.

Edit and Delete Posts: Authors can update or delete their own posts.

Responsive UI: A clean and responsive user interface built with React and Tailwind Css.

RESTful API: Backend powered by Express.js and MongoDB for data storage.

Technologies Used
Frontend: React, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Styling: CSS (Tailwind css)

Installation
Clone the repository:


git clone https://github.com/peterwaf/mern-blog.git
cd mern-blog

Install dependencies:

For the backend:


cd backend
npm install

For the frontend:


cd frontend
npm install
Set up environment variables:

Create a .env file in the backend directory and add the following:

env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Run the application:

Start the backend server:


cd backend
npm start
Start the frontend development server:


cd frontend
npm start
Access the application:

Open your browser and navigate to http://localhost:3000.

Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

License
This project is open-source and available under the MIT License.

Let me know if you'd like to customize this further!