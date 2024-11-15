const jwt = require('jsonwebtoken');

const userauth = (req, res, next) => {
    const jwttoken = req.header('Authorization')
    // console.log(jwttoken);

    if (!jwttoken) return res.json({ message: "Token not received" }); // Add 'return' here

    try {
        const check = jwt.verify(jwttoken, process.env.JWT_SECRET);
        
        if (check) {
            next();
        } else {
            return res.json({ message: "Authentication Failed" }); // Add 'return' here
        }
    } catch (error) {
        return res.json({ message: "Invalid Token", error: error.message }); // Handle invalid token
    }
};

module.exports = userauth;
