const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
    //req uses the headers property to access the Authorization header of the request.
    //The Authorization header is used to provide authentication credentials in the form of a token.
    const token = req.headers['authorization']?.split(' ')[1];
    //token stores the token value from the Authorization header. If the token is not provided, the middleware returns a 401 status code with a message.
    if (!token) {
        return res.status(401).send({ message: 'Access denied! No token provided!' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Access denied! Invalid token!' });
        }
        if (user.role !== 'admin') {
            return res.status(403).send({ message: 'Access denied! You are not an admin!' });
        }
        req.user = user;
        next();
    });
}

module.exports = verifyAdminToken;