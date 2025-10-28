import { Compra } from '../db/models/index.js'

const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

//Create compra
export const createCompra = async (req, res, next) => {
    try{
        const {nombre, precio, producto} = req.body;

        const compra = await Compra.create({
            nombre: nombre,
            precio: precio,
            producto: producto
        });

        ResponseAPI.data = compra;
        ResponseAPI.msg = "La compra se ha realizado correctamente";

        res.status(201).json(ResponseAPI);
    }catch(e){
        next(e);
    }
};

//Read - GET ALL COMPRAS
export const getAllCompras = async (req, res, next) => {

    try{
        const compras = await Compra.find();
        ResponseAPI.data = compras;
        res.status(200).json(ResponseAPI);

    }catch(e){
        console.error("tuvimos un error ", e);
        next(e);
    }
}

//Read - Obtener una compra by ID
export const getCompraById = async (req, res, next) => {
    try{
        const {id} = req.params;

        const compra = await Compra.findById(id);
        if(!compra) return res.status(404).json({ msg: "La compra no se encuentra"});

        ResponseAPI.data = compra;
        ResponseAPI.msg = "La compra se ha encontrado correctamente";
        res.status(200).json(ResponseAPI);
        
    } catch(e){
        next(e)
    }
}

//UPDATE COMPRA
export const updateCompra = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {nombre, precio, producto} = req.body;

        const compraActualizada = await Compra.findByIdAndUpdate( id,
            {nombre, precio, producto},
            {new: true}
        );

        if (!compraActualizada) return res.status(404).json({msg: "La compra no se ha actualizado correctamente"});

        ResponseAPI.data = compraActualizada;
        ResponseAPI.msg = "La compra se ha actualizado correctamente";

        res.status(200).json(ResponseAPI);
    } catch(e) {
        next(e);
    }
}

//DELETE
export const deleteCompra = async (req, res, next) => {
    try{
        const {id} = req.params;

        const compraEliminada = await Compra.findByIdAndDelete(id);

        if (!compraEliminada) return res.status(404).json({msg: "La compra no se ha eliminado con éxito"});

        ResponseAPI.data = compraEliminada;
        ResponseAPI.msg = "Compra eliminada correctamente"

        res.status(201).json(ResponseAPI);
    }catch(e){
        next(e);
    }
}