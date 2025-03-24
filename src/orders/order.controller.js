const Order = require('./order.model');

//create order
const createOrder = async (req, res) => {
    try {
        const newOrder = await Order({ ...req.body });
        await newOrder.save();
        res.status(200).send({ message: "Order created successfully!", order: newOrder });
    }
    catch (err) {
        console.log("Error in creating order", err);
        res.status(500).send({ message: "Error in creating order" });
    }
}

//get all orders by user email
const getOrdersByUserEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({email}).sort({createdAt:-1});
        if(!Order) {
            res.status(404).json({message:"No orders found"});
        }
        res.status(200).json(orders);
    }
    catch (err) {
        console.log("Error in getting orders", err);
        res.status(500).json({ message: "Error in getting orders" });
    }
}

//get single order
const getSingleOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).send({ message: "Order not found" });
        }
        else {
            res.status(200).send(order);
        }
    }
    catch (err) {
        console.log("Error in getting order", err);
        res.status(500).send({ message: "Error in getting order" });
    }
}

module.exports = { createOrder,getOrdersByUserEmail, getSingleOrder };