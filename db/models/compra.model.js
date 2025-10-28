import mongoose from "mongoose";

const options = {
    collection: 'compras',     //Nombre de la coleccion en MongoDB
    strict: true,               //Solo permite guardar los campos definidos en el esquema.
    collation: {
        locale: "es",           //Config. para el idioma español.
        strength: 1,            //nivel de configuración de strings. 1: ignorar mayus, minus y tildes.
    }
}

const compraSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now},
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}]
}, options);

export const Compra = mongoose.model("Compra", compraSchema)