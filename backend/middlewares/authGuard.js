const User = require("../models/User")
const jwt = require("jsonwebtoken") // Para comparar o token, evitando de fazer em todas as rotas que precisam de autenticação centraliza elas.
const jtwSecret = process.env.JWT_SECRET // Valor que tem salvo na aplicação para bater os dados

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"] 
    // 1 - Valida se o token veio na requisição
    const token = authHeader && authHeader.split(" ")[1] //verifica se existe e pega a 2 parte do header 
    //como o token vem "Bearer adfnisdnfidsf1" separa ele em dois pois não precisa do BEARER

    // Check if header as a token 
    if(!token) return res.status(401).json({errors: ["Acesso negado!"]})

    // Check if token is valid 
    try {
        // Comparando o token que vem com o que tem no jwt secret
        //2 - Valida se o token combina com o secret
        const verified = jwt.verify(token, jtwSecret)

        // Pegar o usuario pelo id sem precisr ficar fazendo requisições ao banco o tempo todo
        // 3 - Tenta achar o usuario
        req.user = await User.findById(verified.id).select("-password")

        next()
    } catch(error) {
        return res.status(401).json({errors: ["Token Inválido!"]})
    }
}

module.exports = authGuard
