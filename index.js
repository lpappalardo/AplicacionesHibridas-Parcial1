import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import videojuegos_routes from "./routes/videojuegos_routes.js"
import estudios_routes from "./routes/estudios_routes.js"
import usuarios_routes from "./routes/usuarios_routes.js"
import auth from "./routes/auth.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
// .connect(process.env.CONNECTION)
.connect("mongodb://127.0.0.1:27017/parcial")
.then(() => {console.log("conectado a MongoDB")})
.catch((err) => {console.log("No se pudo conectar: " + err)})

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/estudios", estudios_routes)
app.use("/videojuegos", videojuegos_routes)
app.use("/usuarios", usuarios_routes)
app.use("/login", auth)

app.get('/', (req, res) => {
    // const {pathname: root} = new URL('../src', import.meta.url)
    // res.sendFile(path.join(new URL('./main.html', import.meta.url)));
    res.sendFile(__dirname + '/main.html');
})


const PORT = process.env.PORT || 3002;
app.listen(PORT)