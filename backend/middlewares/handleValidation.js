const {validationResult} = require("express-validator")

// Como é um middleware ele recebe a requisição a resposta e o next que é quando quer ou não prosseguir baseado em algum fato
const validate = (req, res, next) => { 

    const errors = validationResult(req) // Toda req que tiver o midleware de validação vai retornar possiveis erros

    if(errors.isEmpty()) { // Verificando se os erros estão vazios
        return next() // Se não tiver erros prossegue
    }

    // Erros extraidos da requisição
    const extractedErros = []

    // Transfroma em array e faz um map
    errors.array().map((err) => extractedErros.push(err.msg)) //pegando cada um e colocando a msg na extractedErros

    // Returnando erros
    return res.status(422).json({
        errors: extractedErros
    })

}

module.exports = validate

