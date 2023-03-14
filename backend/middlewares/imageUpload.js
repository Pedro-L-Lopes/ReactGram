const multer = require("multer") // Upload de arquivos 
const path = require("path") // Modulo padrão do node


// Destination to store image
const imageStore = multer.diskStorage({
    destination: (req, file, cb) => { // Requisição, arquivo e  possibilidade de ter uma callback
        let folder = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if(req.baseUrl.includes("photos")) {
            folder = "photos"
        }

        // A callback "dizendo" que a pasta para salvar imagens é a uploads
        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            // Upload png and jpeg formats
            return cb(new error("Por favor envie apenas png ou jpg!"))
        } 
        cb(undefined, true)
    }
})

module.exports = { imageUpload }
