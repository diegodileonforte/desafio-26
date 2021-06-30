import express from 'express';
import Producto from '../controllers/Producto.js';
const router = express.Router();
const nuevoProducto = new Producto();


router.post('/', nuevoProducto.add);
router.get('/', nuevoProducto.getAll);
router.get('/:id', nuevoProducto.getById);
router.delete('/:id', nuevoProducto.delete);
router.put('/:id', nuevoProducto.update);



export default router;