//Configurar datos de mi servidor

//Importar libreria de express
import express from 'express';
import cors from 'cors';


import router from './routes/index.routes.js'
import { conectarDB } from './db/mongoose.js';

//Variables de entorno
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost"
const NOMBRE = process.env.NOMBRE || 'Wanderful Agencia';

//crear instancia en express
const app = express();

//Middlewares
//Acceso desde cualquier servidor
app.use(cors());    //Permite solicitudes desde react
app.use(express.json());    //Leer datos que vienen en el body de mi request
app.use(express.urlencoded({extended: true}));      //Permite leer datos desde formularios HTML

//llamar a la función de conexión
conectarDB();

//Contenido estático
app.use("/uploads", express.static('public/uploads'));
app.use("/web", express.static('public') );


app.get("/", (req, res, next) => {
    res.setHeader("Content-Type", "text/html");     //Nuestra respuesta va a ser en HTML

    const landingHtml = `
        <h1>${NOMBRE}</h1>
        <p>Bienvenidos a nuestro Backend en Express</p>
        `;
        res.send(landingHtml)
})


//RUTAS
//Ruta para registrar usuarios
app.post("/api/v1/auth/register", (req, res) => {
    const {nombre, email, password } = req.body;
    if(!nombre || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios"});
    }

    return res.status(200).json({ message: "Usuario registrado correctamente"});
});

//Ruta para que se logeen los usuarios
app.post("/api/v1/auth/login", (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({ message:"Todos los campos son obligatorios"});
    }

    return res.status(200).json({ message: "Usuario logeado correctamente"})
});

//Ruta para obtener una compra
app.post("/api/v1/compras", (req, res) => {
    const {nombre, precio, producto} = req.body;
    if(!nombre || !precio || !producto) {
        return res.status(400).json({ message: `No se ha podido realizar la compra del viaje ${nombre}`});
    }

    return res.status(200).json({ message:`La compra del viaje ${nombre} se ha realizado correctamente`})
})

//Ruta para crear un producto
app.post("/api/v1/productos", (req, res) => {
    const {nombre, precio, compras} = req.body;
    if(!nombre || !precio || !compras) {
        return res.status(400).json({ message: `No se ha podido añadir el viaje ${nombre} a su carrito de compras`});
    }

    return res.status(200).json({ message: `Se ha añadido el viaje ${nombre} a su carrito de compras`})
})



router.get('/usuarios', (req, res) =>{
    res.json({ message: 'Ruta de usuarios!'});
})

app.use("/api/v1", router);


app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${HOST}:${PORT}`);
})
