import express from 'express'
import Info from '../controllers/Info.js'
import compression from 'compression'
const infoRouter = express.Router()
const info = new Info()

infoRouter.get('/', info.getInfo )
infoRouter.get('/zip', compression() ,info.getInfoZip )

export default infoRouter