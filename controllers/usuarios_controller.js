import Usuario from "../models/usuarios_model.js"
import bcrypt from "bcrypt"

async function getUsers(){
    let usuarios = await Usuario.find({estado:true});
    return usuarios;
}

async function createUser(body){
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
        estado: true
    })
    return await usuario.save();
}

async function updateUser(id, body){
    let usuarioActualizado = await Usuario.findByIdAndUpdate(id, {
        $set: {
            email: body.email,
            nombre: body.nombre,
            password: body.nombre,
        }
    }, {new: true})
    return usuarioActualizado;
}

export { getUsers, createUser, updateUser}