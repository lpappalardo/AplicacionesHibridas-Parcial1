import mongoose from "mongoose"

const estudiosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    juegosPublicados: {
        type: Number,
        required: true
    },
})

export default mongoose.model('Estudios', estudiosSchema)