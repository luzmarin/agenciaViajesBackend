import { Router } from 'express';
import { createUsuario, getAllUsuarios, getUsuarioById, deleteUsuario, updateUsuario } from '../controllers/usuarios.controller.js';
import { createProducto, getAllProductos, getProductoById, UpdateProducto, deleteProducto} from '../controllers/productos.controller.js';
import { createCompra, getAllCompras, getCompraById, updateCompra, deleteCompra } from '../controllers/compras.controller.js';
import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller.js';
import {authMiddleWare} from '../middleware/auth.middleware.js';

const router = Router();

//USUARIOS
router.post("/usuarios", createUsuario);                //Registrarse
router.get("/usuarios", getAllUsuarios);
router.get("/usuarios/:id", getUsuarioById);
router.put("/usuarios/:id", updateUsuario)
router.delete("/usuarios/:id", deleteUsuario);

//PRODUCTOS
router.post("/productos", createProducto);                   //Poner a la venta un producto
router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);
router.put("/productos/:id", UpdateProducto);
router.delete("/productos/:id", deleteProducto);

//COMPRAS
router.post("/compras", createCompra);
router.get("/compras", getAllCompras);
router.get("/compras/:id", getCompraById);
router.put("/compras/:id", updateCompra);
router.delete("/compras/:id", deleteCompra);

//Rutas de Auth(Autentificación)
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleWare, getCurrentUser);            //Prueba para traer datos usando el token

router.get("/protected", authMiddleWare, (req, res) => {
    res.json({message: "Estas en una cuenta protegida"})
});


export default router;