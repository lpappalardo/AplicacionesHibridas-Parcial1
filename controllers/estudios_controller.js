import Estudio from "../models/estudios_model.js"

async function getEstudios(){
    let estudios = await Estudio.find();
    return estudios;
}

async function getAEstudio(id){
    let estudio = await Estudio.findOne({_id: id})
    return estudio;
}


async function createEstudio(body){
    let estudio = new Estudio({
        nombre: body.nombre,
        descripcion: body.descripcion,
        pais: body.pais,
        juegosPublicados: body.juegosPublicados,
    })
    return await estudio.save();
}

async function updateEstudio(id, body){
    let estudioActualizado = await Estudio.findByIdAndUpdate(id, {
        $set: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            pais: body.pais,
            juegosPublicados: body.juegosPublicados,
        }
    }, {new: true})
    return estudioActualizado;
}

async function deleteAEstudio(id){
    let estudio = await Estudio.findByIdAndDelete({_id: id})
    return estudio;
}

async function moreThanEstudio(cantidad){
    let estudios = await Estudio.find({juegosPublicados: {$gte: cantidad}});
    return estudios;
}

async function nameEstudio(nombreEstudio){
    let estudios = await Estudio.findOne({nombre: nombreEstudio});
    return estudios;
}


async function orderEstudios(){
    let estudiosOrdenados = await Estudio.find().sort({juegosPublicados: 1});
    return estudiosOrdenados;
}

async function pagesEstudios(pagina, cantidad){
    let saltear = (pagina * cantidad) - (1 * cantidad);
    if(saltear < 0){
        saltear = 0;
    }
    let estudios = await Estudio.find().skip(saltear).limit(cantidad);
    return estudios;
}

export { getEstudios, getAEstudio, createEstudio, updateEstudio, deleteAEstudio, moreThanEstudio, nameEstudio, orderEstudios, pagesEstudios }