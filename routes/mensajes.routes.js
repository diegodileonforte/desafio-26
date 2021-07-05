import express from 'express'
import Mensaje from '../controllers/Mensaje.js'
import { validate } from '../passport/auth.js'
const routerMsg = express.Router()
const msg = new Mensaje()


routerMsg.post('/', validate, msg.add)
routerMsg.get('/', validate, msg.getAll)
routerMsg.get('/norm', msg.normalizedData)

export default routerMsg;