import mongoose from "mongoose";

const options = {
    collection: 'usuarios',     //Nombre de la coleccion en MongoDB
    strict: true,               //Solo permite guardar los campos definidos en el esquema.
    collation: {
        locale: "es",           //Config. para el idioma español.
        strength: 1,            //nivel de configuración de strings. 1: ignorar mayus, minus y tildes.
    }
}

const usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    edad: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },

    createAt: {             //Fecha de creación
        type: Date,
        default: Date.now
    }
}, options);

export const Usuario = mongoose.model('Usuario', usuarioSchema);