const express = require('express')
const Book = require('./book.model')
const { postAddBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router()

//From Frontend => Backend => controller => model/book schema => database =>send data to the server => send data back to the frontend

//CRUD: 
//Create, Read, Update, Delete
//HTTP methods: post, get, put, delete
//post = it submits data to the database
//get = it fetches/gets data from the database
//put = it updates data in the database
//delete = it deletes data from the database

//create a book by admin only 
//router post has 3 parameters: the first is the path, the second is the middleware function the middleware function is verifyAdminToken
//which checks if the user is an admin if the user is an admin, then the postAddBook function that creates a new book
router.post("/create-book", verifyAdminToken, postAddBook);

//get all books
router.get("/", getAllBooks)

//get single book
router.get("/:id", getSingleBook);

//update a book
router.put("/edit/:id", verifyAdminToken, updateBook);

//delete a book
router.delete("/:id", verifyAdminToken, deleteBook);

module.exports = router;