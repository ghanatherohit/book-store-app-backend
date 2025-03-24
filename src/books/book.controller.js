const Book = require("./book.model");

const postAddBook = async (req, res) => {
    // console.log(req.body)
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book created successfully!", book: newBook })
    }
    catch (err) {
        console.log("Error in creating book", err)
        res.status(500).send({ message: "Error in creating book" })
    }
}

//get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    }
    catch (err) {
        console.log("Error in getting books", err) 
        res.status(500).send({ message: "Error in getting books" })
    }
}

const getSingleBook = async (req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book) {
            res.status(404).send({message:"Book Not Found"})
        }
        res.status(200).send(book);
    }
    catch(err) {
        console.log("Error in getting books",err);
        res.status(500).send({message:"Error in getting books"})
    }
}

const updateBook = async (req,res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body,{new: true});
        if(!updatedBook) {
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.log("Error update a book ",error);
        res.status(500).send({message:"Failed to update a book"});
    }
}

const deleteBook = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message:"Book Not Found"});
        }
        res.status(200).send({
            message:"Book deleted successfully",
            book:deletedBook
        })
    } catch (error) {
        console.log("Error deleting a book",error);
        res.status(500).send({message:"Failed to delte a book"});
    }
}


module.exports = {
    postAddBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
};