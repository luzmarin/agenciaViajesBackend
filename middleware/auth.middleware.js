import { JWT_SECRET } from '../config/config.js';
import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer', '');       //En caso de que exista se va a cambiar el string bearer por nada

    if(!token){        //Si el token no existe
        return res.status(401).json({message: "Acceso denegado. Token requerido"});
    }

    try{
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;    // guardo el id extraido del token en el request.
        next();

    } catch (e){
        res.status(401).json({message: "Acceso denegado. Token invalido o expirado"});
    }
}