const mongoose = require('mongoose')
const {Schema} = mongoose // Schema -> Como se fosse o esqueleto do model

const userSchema = new Schema(
    {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String  
    },
    {
        timestamps: true //Dois campos serão criados no model create_at e update_at 
    }
)

const User = mongoose.model("User", userSchema) //Definindo model nome: User, é necessario passar um schema para para o modulo

module.exports = User 
