const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")

// Inserta a photo, with an user related to it
const insertPhoto = async(req, res) => {

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    // If photo was created successfully, return data
    if(!newPhoto){
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde."]
        })
        return
    }

    res.status(201).json(newPhoto)
}

// Remove a photo from DB
const deletePhoto = async(req, res) => {

    const {id} = req.params // Id da foto pela url

    const reqUser = req.user // Usuario pela requisição

   try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //  Check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    // Check if photo belongs to user 
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["Ocorreu um erro, tente novamente mais tarde."]})
        return
    }

    await Photo.findByIdAndDelete(photo._id)

    res.status(200).json({id: photo._id, message: "Foto excluída com sucesso!"})
   } catch (error) {
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
   }
}

// Get all photos
const getAllPhotos = async(req, res) => {
    // Find({}) == buscar todos // createdAt", -1 == Buscar os mais novos primeiro // .exec() == executar a "querry"
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)

}

// Get user photos
const getUserPhotos = async(req, res) => {
    const {id} = req.params // Id da url pois pposso pegar as fotos de qualquer usuario e não apenas o seu

    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)
}

// Get photo by id
const getPhotoById = async(req, res) => {
    const {id} = req.params

    const photo = await Photo.find(mongoose.Types.ObjectId(id))

    //Check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    res.status(200).json(photo)
}

// Update a photo
const UpdatePhoto = async(req, res) => {

    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    //Check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    //Check if photo belongs to user
    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})
        return
    }

    if(title){
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message: "Foto atualizada com sucesso!"})
}

// Like Functionality
const likePhoto = async (req, res) => {

    const {id} = req.params
    const reqUser = req.user

    const photo = await Photo.findById(id)

    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    // Check if user alredy like the photo
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors: ["Você já curtiu a foto."]})
        return
    }

    // Put user id in likes array
    photo.likes.push(reqUser._id)

    photo.save()

    res.status(200).json({photoId: id, userId: reqUser._id, message: "A foto  foi curtida"})
}

// Comment Functionality
const CommentPhoto = async(req, res) => {
    const {id} = req.params
    const {comment} = req.body

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    const photo = await Photo.findById(id)

    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    // Put comment in the array of comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: "O comentário foi adicionado com sucesso!"
    })
}

// Search photos by title
const searchPhotos = async(req, res) => {
    const {q} = req.query // espera o argumento q da querry string da url, não vem como parametro

    // Necessario fazer uma expressão regular, instanciar o objeto com new regExp() dizendo que o q que estou procurando está em qualquer lugar da string. ( vai ignorar a caseSensitive)
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

    res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    UpdatePhoto,
    likePhoto,
    CommentPhoto,
    searchPhotos,
}