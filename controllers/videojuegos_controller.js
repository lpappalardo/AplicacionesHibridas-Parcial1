import Videojuegos from "../models/videojuegos_model.js";

async function getVideojuegos(){
    let videojuegosActivos = await Videojuegos.find()
    .populate('desarrollador',' nombre pais juegosPublicados -_id')
    return videojuegosActivos;
}

async function createVideojuegos(req){
    let videojuegoNuevo = new Videojuegos({
        nombre: req.body.nombre,
        genero: req.body.genero,
        descripcion: req.body.descripcion,
        fechaLanzamiento: req.body.fechaLanzamiento,
        idiomas: req.body.idiomas,
        estado: true,
        desarrollador: req.params.id
    })
    return await videojuegoNuevo.save();
}

async function updateVideojuegos(id, body){
    let videojuegoActualizado = await Videojuegos.findByIdAndUpdate(id, {
        $set: {
            nombre: body.nombre,
            genero: body.genero,
            descripcion: body.descripcion,
            fechaLanzamiento: body.fechaLanzamiento,
            idiomas: body.idiomas,
        }
    }, {new: true})
    return videojuegoActualizado;
}

async function containsGenreVideojuegos(generoElegido){
    let videojuegos = await Videojuegos.find({genero: { $in : [generoElegido] }})
    .populate('desarrollador',' nombre pais juegosPublicados -_id')
    return videojuegos;
}

async function nameVideojuego(nombreVideojuego){
    let videojuego = await Videojuegos.findOne({nombre: nombreVideojuego});
    return videojuego;
}

async function orderVideojuegos(){
    let videojuegosOrdenados = await Videojuegos.find().sort({fechaLanzamiento: 1})
    .populate('desarrollador',' nombre pais juegosPublicados -_id')
    return videojuegosOrdenados;
}

// async function pagesVideojuegos(cantidad){
//     let videojuegos = await Videojuegos.find().limit(cantidad);
//     return videojuegos;
// }

async function pagesVideojuegos(pagina, cantidad){
    let saltear = (pagina * cantidad) - (1 * cantidad);
    if(saltear < 0){
        saltear = 0;
    }
    let videojuegos = await Videojuegos.find().skip(saltear).limit(cantidad);
    return videojuegos;
}

async function getAVideojuego(id){
    let videojuego = await Videojuegos.findOne({_id: id})
    return videojuego;
}

async function deleteAVideojuego(id){
    let videojuego = await Videojuegos.findByIdAndDelete({_id: id})
    return videojuego;
}


export { getVideojuegos, createVideojuegos, updateVideojuegos, containsGenreVideojuegos, nameVideojuego, orderVideojuegos, pagesVideojuegos, getAVideojuego, deleteAVideojuego }