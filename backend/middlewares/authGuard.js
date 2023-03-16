const User = require("../models/User")
const jwt = require("jsonwebtoken") 
const jtwSecret = process.env.JWT_SECRET 

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"] 
    const token = authHeader && authHeader.split(" ")[1] 
    // Check if header as a token 
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

    // Check if token is valid 
    try {
        const verified = jwt.verify(token, jtwSecret)
        
        req.user = await User.findById(verified.id).select("-password")

        next()
    } catch(error) {
        return res.status(401).json({errors: ["Token Inválido!"]})
    }
}

module.exports = authGuard
