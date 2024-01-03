/* /backend/middleware/auth.js */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //extracting the token from the frontend in the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '12345678907464534262945050683619');

        //Attach the decoded token to the request object 
        req.userData = {userId: decodedToken.userId, email: decodedToken.email };

        next(); // Call next to move on to the next middleware
    } catch(err) {
        console.log('Error: ', err);
        return res.status(401).json({message: 'Authentication failed'});
    }
};
