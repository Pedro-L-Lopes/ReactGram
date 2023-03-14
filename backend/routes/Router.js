const express = require("express")
const router = express()

// Importanto rota de usuario para disponiblizar para a aplicação
router.use("/api/users", require("./UserRoutes")) //Aqui já  vai estar adicionando o prefixo de api
router.use("/api/photos", require("./PhotoRoutes")) 

// Test rout
router.get("/", (req, res) => {
    res.send("API WORKING!")
})

module.exports = router