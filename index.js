/*
// This is the entry point of the application. It creates an Express app and listens on port 3000.
const express = require('express')

// Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
const app = express()

// This means that if the PORT environment variable is set, the server will listen on that port. Otherwise, it will listen on port 3000.
const port = process.env.PORT || 3000

// This is a simple route that sends a response to the client with the text "Hello World!".
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// This starts the server and listens on port 3000.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
*/

const express = require('express')

const app = express()

//cors is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
//Cors is commonly used to enable cross-origin requests to a server. 
const cors = require('cors')

// Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const mongoose = require('mongoose');


const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const dotenv = require("dotenv");

//dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
dotenv.config();

app.use(helmet()); // Secure headers
app.use(mongoSanitize()); // Prevent MongoDB NoSQL Injection
app.use(xssClean()); // Prevent XSS attacks

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);


//middleware
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle.

//app uses the express.json() middleware to parse incoming requests with JSON payloads.
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','https://book-store-app-frontend-phi.vercel.app','https://book-store-app-git-3da3a8-2004ghanatherohit-gmailcoms-projects.vercel.app'],
  credentials: true
}));


// This means that if the PORT environment variable is set, the server will listen on that port. Otherwise, it will listen on port 5000.
const port = process.env.PORT || 5000

//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/user/user.route');
const adminRoutes = require('./src/admin/admin.stats');

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

//this is the main function that connects to the database and starts the server 
async function main() {
  //connect to the database
  await mongoose.connect(process.env.DB_URL);
  // This is a simple route that sends a response to the client with the text "Welcome to the backend server!".
  app.get('/', (req, res) => {
    res.send(`Welcome to the backend server!`)
  })
}



main().then(() => console.log("Mongodb connected successfully!")).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
 