require("dotenv").config() // Da acesso ao arquivo .env

const express = require("express")
const path = require("path") // Do propio nodeJs para determinar depois onde será o diretorio das imagens 
const cors = require("cors") // Acessar o projeto pelo front-end

const port = process.env.PORT // Acessando pelo arquivo .env

const app = express() // Invocando o framework

// config JSON e form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Solve CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"})) //Local onde está hospedado para a requisição funcionar

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
//express.static() === Esta pasta vai conter arquivos estaticos
//path.join(__dirname, "/uploads") === Juntando o nome do diretorio atual com "/uploads"

// DB connection
require("./config/db.js")

// Routes
const router = require("./routes/Router.js")

app.use(router)

// Iniciando aplicação
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})