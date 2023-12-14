const express = require("express");
const books = require("../model/bookModel.js")

const router = express.Router();



//for registering book
router.post('/registerBooks', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.price ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.send({
                message: "error!!! sari information de la*de"
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            publishYear: req.body.publishYear,
        }
        const neBook = await books.create(newBook)
        return res.status(201).json({
            message: "Book added successfully",
            data: createdBook
        });
    } catch (error) {
        console.log("book entering error : " , error)
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
})
// for getting all books
router.get('/bookstore', async (req, res, next) => {
    try {
        const bookCollection = await books.find({});
        return res.json({
            count: bookCollection.length,
            data: bookCollection
        })
    } catch (error) {
        console.log(error);
    }
})
// for getting 1 books using ID
router.get('/bookstore/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bookInfo = await books.findById(id);
        return res.json(bookInfo)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;