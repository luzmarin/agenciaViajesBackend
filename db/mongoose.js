import mongoose from "mongoose";
import { DB_PASS, CLUSTER, DATABASE } from '../config/config.js';

//Conexión a mongoDB
export const conectarDB = async () => {

    const url = `mongodb+srv://lzmcantos_db_user:${DB_PASS}@${CLUSTER}/${DATABASE}?appName=cei-practicas`;

    try {
        await mongoose.connect(url);
        console.log("Conectado a MongoDB");
        console.log("Base de datos actual: ", mongoose.connection.db.databaseName);

        //Preguntar que colecciones tengo disponibles
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Colecciones disponibles:", collections.map(c => c.name));

    } catch (e){
        console.error("Error al conectarse:", e)

    }
}

