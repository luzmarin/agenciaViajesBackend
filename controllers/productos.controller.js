import { Producto } from '../db/models/index.js'

const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

//Create
export const createProducto = async (req, res, next) => {
    try{
        const {nombre, precio, compras} = req.body;

        const producto = await Producto.create({
            nombre: nombre,
            precio: precio,
            compras: compras
        });

        ResponseAPI.data = producto;
        ResponseAPI.msg = "Producto creado correctamente";

        res.status(201).json(ResponseAPI);
    }catch(e){
        next(e);
    }
};

//Read - GET ALL PRODUCTOS
export const getAllProductos = async (req, res, next) => {

    try{
        const productos = await Producto.find()
        ResponseAPI.data = productos;
        res.status(200).json(ResponseAPI);

    }catch(e){
        console.error("tuvimos un error ", e);
        next(e);
    }
}

//Read - Obtener un usuario by ID
export const getProductoById = async (req, res, next) => {
    try{
        const {id} = req.params;
        
        const producto = await Producto.findById(id);
        if(!producto) return res.status(404).json({ msg: "Producto no encontrado"});

        ResponseAPI.data = producto;
        ResponseAPI.msg = "Producto encontrado";
        res.status(200).json(ResponseAPI);

    } catch(e){
        next(e)
    }
}

//Update
export const UpdateProducto = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const {nombre, precio, compras} = req.body;

        const productoActualizado = await Producto.findByIdAndUpdate( id,
            {nombre, precio, compras},
            { new: true }
        );

        if (!productoActualizado) return res.status(404).json({ msg: "El producto no se ha actualizado correctamente"});

        ResponseAPI.data = productoActualizado;
        ResponseAPI.msg = "El producto se ha actualizado correctamente";

        res.status(200).json(ResponseAPI);
    } catch (e) {
        next(e);
    }
}

//Delete
export const deleteProducto = async (req, res, next) => {
    try{
        const {id} = req.params;

        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) return res.status(404).json({msg: "producto no eliminado"});

        ResponseAPI.data = productoEliminado;
        ResponseAPI.msg = "Producto eliminado correctamente";

        res.status(201).json(ResponseAPI);
    }catch(e){
        next(e);
    }
};