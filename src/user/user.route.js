const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

//Why we use post insted of get?
//The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.

//The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
router.post('/admin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username });
        if (!admin) {
            return res.status(400).send({ message: 'Admin Not found!' });
        }
        if (admin.password !== password) {
            return res.status(400).send({ message: 'Invalid password!' });
        }
        // The jwt.sign() method is used to generate a token. It takes three arguments: the payload, the secret key, and the options.
        // The payload is an object that contains the data that you want to store in the token. In this case, the payload contains the user's id, username, and role.
        const token = jwt.sign({ id: admin._id, username: admin.username, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log(token)
        return res.status(200).json({
            message: 'Admin logged in successfully!',
            token: token,
            user: {
                username: admin.username,
                role: admin.role,
            }
        });
    } catch (error) {
        console.error("Failed to create user", error);
        res.status(400).send({ message: 'Failed to create user', error: error.message });
    }
});

module.exports = router;