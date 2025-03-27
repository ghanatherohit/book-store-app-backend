const express = require('express');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');
const router = express.Router();

router.get('/stats', verifyAdminToken, async (req, res) => {
    try {
        //  1. Get total number of orders from the database by counting the number of documents in the Order collection
        // The countDocuments() method is used to count the number of documents that match the specified query criteria
        const totalOrders = await Order.countDocuments();

        //  2. Get total sales from the database by summing the totalPrice field of all documents in the Order collection
        // The aggregate() method is used to perform aggregation operations on the documents in a collection
        const totalSales = await Order.aggregate([
            {
                //$group is an aggregation operator that groups documents by a specified expression and applies accumulator expressions
                //to each group of documents
                $group: {
                    _id: null,
                    totalSales: {
                        //$sum is an accumulator operator that calculates the sum of numeric values
                        $sum: '$totalPrice'
                    }
                }
            }
        ]);

        // 3. Trending books Statistics from query
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },
            { $count: 'trendingBooksCount' }
        ]);

        // count the number of trending Books
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        // 4. Get total number of books from the database by counting the number of documents in the Book collection
        const totalBooks = await Book.countDocuments();

        // 5. Monthly sales statistics 
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: {  $dateToString: { format: "%Y-%m", date: "$createdAt" }  },
                    totalSales: { $sum: '$totalPrice' },
                    totalOrders: { $sum: 1 }
                }
            },
            //sort the results by date in ascending order
            { $sort: { _id: 1 } }
        ]);
        res.status(200).json({
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalOrders,
            totalBooks,
            monthlySales
        })

    } catch (error) {
        res.status(300).json("Error fetching admin statistics", error)
        console.error("Error fetching admin statistics", error)
    }
})

module.exports = router;