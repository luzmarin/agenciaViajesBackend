import { Usuario } from '../db/models/index.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'
import bcrypt from 'bcrypt';

const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}


export const registerUser = async (req, res, next) => {
    try {
        //Traer cosas del body
        const {email, password, name} = req.body;

        //Verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                mensaje: "El usuario con este email ya existe, si eres tú, intenta hacer login"
            });
        }

        // generar un salt key
        const salt = await bcrypt.genSalt(10);  //10 es seguro para claves

        //Hasth de nuestra clave
        const hashedPassword = await bcrypt.hash(password, salt);

        //Crear el nuevo usuario
        const user = new Usuario({
            email, password: hashedPassword, name
        });
        await user.save();

        //Generar nuevo Token JWT
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name
            },
            JWT_SECRET,                         //Clave secreta
            {                                   //Configuraciones/opciones 
                expiresIn: '2h'
            });

        //Devolver datos del usuario + JWT Token
        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (e){
        next(e);
    }
}

export const loginUser = async (req, res, next) => {

    try {
        //Recibir datos del request
        const { email, password } = req.body;

        //Verificar si existe el usuario
        const user = await Usuario.findOne({email});

        //Termino la petición si el usuario no existe
        if(!user){
            return res.status(401).json({message: "Usuario o clave invalidos"});
        }

        //comparo la clave del request con la clave de la DB
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {return res.status(401).json({message:"Clave incorrecta"})}
        
        //Generar nuevo Token JWT
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name
            },
            JWT_SECRET,                         //Clave secreta
            {                                   //Configuraciones/opciones 
                expiresIn: '2h'
            });

        //Devolver datos del usuario + JWT Token

        res.status(201).json({
            mensaje: "Accediste correctamente",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch(e){
        next(e)
    }
}
export const getCurrentUser = async (req, res, next) => {
    
    try{

        //obtener el id del TOKEN
        const idUsuario = req.userId;

        const user = await Usuario.findById(idUsuario).select('-password');         //Trae todo el usuario pero sin el password
        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const ResponseAPI = {
            message: "Usuario encontrado",
            data: user,
            status: "ok"
        }
        res.status(200).json(ResponseAPI)

    }catch(e){
        next(e);
    }
}