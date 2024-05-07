import express  from "express"
import { getUsers, createUser, updateUser } from "../controllers/usuarios_controller.js"
import Joi from "joi"


const ruta = express.Router()

const schema = Joi.object({
    nombre: Joi.string()
                .alphanum()
                .min(4)
                .max(10)
                .required(),
    password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}})
})

ruta.get('/', (req, res) =>{
    let resultado = getUsers()
    resultado
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.post('/', (req, res) =>{
    let body = req.body;

    const {error }= schema.validate({nombre: body.nombre, email: body.email, password: body.password})

    if(!error){
        let resultado = createUser(body)
        resultado
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(400).json({err})
        })
    }else{
        res.status(400).json(error)
    }
})

ruta.put('/:id', (req, res) =>{
   let body = req.body;
   let resultado = updateUser(req.params.id, body)
    resultado
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})



export default ruta;