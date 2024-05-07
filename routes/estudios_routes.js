import express  from "express"
import { getEstudios,  getAEstudio, createEstudio, updateEstudio, deleteAEstudio, moreThanEstudio, nameEstudio, orderEstudios, pagesEstudios } from "../controllers/estudios_controller.js"
import verificarToken from "../middlewares/auth.js"
import Joi from "joi"

const ruta = express.Router()

const schema = Joi.object({
    nombre: Joi.string()
                .min(4)
                .max(30)
                .required(),
    descripcion: Joi.string()
                    .min(10)
                    .max(600)
                    .required(),
    pais: Joi.string()
            .min(3)
            .max(20)
            .required(),
    juegosPublicados: Joi.number()
                        .required(),
})

ruta.get('/', verificarToken, (req, res) =>{
    let resultado = getEstudios()
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/:id', verificarToken, (req, res) =>{
    let resultado = getAEstudio(req.params.id)
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.post('/', verificarToken, (req, res) =>{
    let body = req.body;

    const {error }= schema.validate({nombre: body.nombre, descripcion: body.descripcion, pais: body.pais, juegosPublicados: body.juegosPublicados})

    if(!error){
        let resultado = createEstudio(body)
        resultado
        .then(estudio => {
            res.json(estudio)
        })
        .catch(err => {
            res.status(400).json({err})
        })
    }else{
        res.status(400).json(error)
    }
})

ruta.put('/:id', verificarToken, (req, res) =>{
   let body = req.body;
   let resultado = updateEstudio(req.params.id, body)
    resultado
    .then(estudio => {
        res.json(estudio)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.delete('/:id', verificarToken, (req, res) =>{
    let resultado = deleteAEstudio(req.params.id)
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/juegosPublicados/:cantidad', verificarToken, (req, res) =>{
    let resultado = moreThanEstudio(req.params.cantidad)
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})


ruta.post('/nombre/:nombreSelecionado', verificarToken, (req, res) =>{
    let resultado = nameEstudio(req.params.nombreSelecionado)
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/paginas', verificarToken, (req, res) =>{
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    let resultado = pagesEstudios(pagina, cantidad)
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/ordenamiento', verificarToken, (req, res) =>{
    let resultado = orderEstudios()
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})


export default ruta;