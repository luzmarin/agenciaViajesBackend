import { Usuario } from "../db/models/index.js";

const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

//Create
export const createUsuario = async (req, res, next) => {
    try{
        const {nombre, email} = req.body;

        const user = await Usuario.create({
            nombre: nombre,
            email: email
        });

        ResponseAPI.data = user;
        ResponseAPI.msg = "Usuario creado correctamente";

        res.status(201).json(ResponseAPI);
    }catch(e){
        next(e);
    }
};

//Read - GET ALL USUARIOS
export const getAllUsuarios = async (req, res, next) => {

    try{
        const users = await Usuario.find();
        ResponseAPI.data = users;
        res.status(200).json(users);

    }catch(e){
        console.error("tuvimos un error ", e);
        next(e);
    }
}

//Read - Obtener un usuario by ID
export const getUsuarioById = async (req, res, next) => {

    try{
        const {id} = req.params;

        const user = await Usuario.findById(id);
        if (!user) return res.status(404).json({msg: "Usuario no encontrado"});

        ResponseAPI.data = user;
        res.status(200).json(ResponseAPI)
    } catch(e){
        next(e);
    }
};

//update usuario
export const updateUsuario= async (req, res, next) => {
    try{
        const {id} = req.params;
         const {nombre, email} = req.body;

        const user = await Usuario.findByIdAndUpdate( id,
            { nombre: nombre, email: email }
        );

        if (!user) return res.status(404).json({msg: "Usuario no encontrado"});

        ResponseAPI.data = user;
        ResponseAPI.msg = "Usuario actualizado correctamente";

        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("tuvimos un error", e)
    }
};

//Delete usuario
export const deleteUsuario = async (req, res, next) => {
    try{
         const {id} = req.params;

        const user = await Usuario.findByIdAndDelete(id);

        if(!user) return res.status(404).json({msg: "Usuario no encontrado"});

        ResponseAPI.data = user;
        ResponseAPI.msg = "Se ha eliminado el usuario correctamente";

        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("tuvimos un error", e)
    }
};
