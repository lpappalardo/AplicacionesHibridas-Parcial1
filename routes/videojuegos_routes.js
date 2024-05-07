import express from "express"
import { getVideojuegos, createVideojuegos, updateVideojuegos, containsGenreVideojuegos, nameVideojuego, orderVideojuegos, pagesVideojuegos, deleteAVideojuego, getAVideojuego } from "../controllers/videojuegos_controller.js"
import verificarToken from "../middlewares/auth.js"

const ruta = express.Router()

ruta.get('/', verificarToken, (req, res) =>{
    let resultado = getVideojuegos()
    resultado
    .then(videojuegos => {
        res.json(videojuegos)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.post('/:id', verificarToken, (req, res) =>{
    let resultado = createVideojuegos(req)
    resultado
    .then(videojuego => {
        res.json(videojuego)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.put('/:id', verificarToken, (req, res) =>{
   let body = req.body;
   let resultado = updateVideojuegos(req.params.id, body)
    resultado
    .then(videojuego => {
        res.json(videojuego)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})


ruta.get('/genero/:generoSelecionado', verificarToken, (req, res) =>{
    let resultado = containsGenreVideojuegos(req.params.generoSelecionado)
    resultado
    .then(videojuegos => {
        res.json(videojuegos)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})


ruta.post('/nombre/:nombreSelecionado', verificarToken, (req, res) =>{
    let resultado = nameVideojuego(req.params.nombreSelecionado)
    resultado
    .then(estudios => {
        res.json(estudios)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})


ruta.get('/ordenamiento', verificarToken, (req, res) =>{
    let resultado = orderVideojuegos()
    resultado
    .then(videojuegos => {
        res.json(videojuegos)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/paginas', verificarToken, (req, res) =>{
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    let resultado = pagesVideojuegos(pagina, cantidad)
    resultado
    .then(videojuegos => {
        res.json(videojuegos)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.delete('/:id', verificarToken, (req, res) =>{
    let resultado = deleteAVideojuego(req.params.id)
    resultado
    .then(videojuegos => {
        res.json(videojuegos)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

ruta.get('/:id', verificarToken, (req, res) =>{
    let resultado = getAVideojuego(req.params.id)
    resultado
    .then(videojuegos => {
        res.json(videojuegos)
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

export default ruta;