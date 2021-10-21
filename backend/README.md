# shubham_node_jeeves

This is a submission for FullStack Assignment

Node Version: Node.js v14.16.1 (Should work fine on 12.x and later)

Steps to run the project
  1. Clone the project
  2. Switch to project directory
  3. Run 'npm install'
  4. Make a .env file in root directory, paste relevant content according to your environment
      PORT=5000
      ROOT_DB_USER=root
      ROOT_DB_PASS=your_password
      DB_NAME=full_assignment_jeeves
      JWT_SECRET=assignment
      TOKEN_EXPIRY=6h
  5. Make a "property_image" folder in project root directory. (used to store uploaded images)
  6. Run "npm run createdb" to create the database as mentioned in .env file. (Only once)
  7. Run "npm start" to run the main server.

DATABSE : MySql
Programming Language : Javascript
Runtime : Node.js
ORM : Sequelize.js

Request Handlers : You can find all handlers inside controllers folder.
Model Files : All model files are inside models folder.
Routes : All routes are inside routes folder.


Author: Shubham Sharma