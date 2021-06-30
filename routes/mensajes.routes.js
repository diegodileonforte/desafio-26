import express from 'express';
import Mensaje from '../controllers/Mensaje.js';
const routerMsg = express.Router();
const msg = new Mensaje();

routerMsg.post('/', msg.add);
routerMsg.get('/', msg.getAll);

export default routerMsg;