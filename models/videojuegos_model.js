import mongoose from "mongoose";
const Schema = mongoose.Schema;

const videojuegoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    genero: {
        type: [String],
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    fechaLanzamiento: {
        type: String,
        required: true
    },
    idiomas: {
        type: [String],
        required: true
    },

    estado: {
        type: Boolean,
        required: true
    },

    desarrollador: {
        type: Schema.Types.ObjectId, ref: 'Estudios'
    } 
})

export default mongoose.model('Videojuegos', videojuegoSchema)