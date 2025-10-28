import mongoose from "mongoose";

const options = {
    collection: 'productos',     //Nombre de la coleccion en MongoDB
    strict: true,               //Solo permite guardar los campos definidos en el esquema.
    collation: {
        locale: "es",           //Config. para el idioma español.
        strength: 1,            //nivel de configuración de strings. 1: ignorar mayus, minus y tildes.
    }
}

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref:'Compra' }]
}, options);

export const Producto = mongoose.model("Producto", productoSchema)