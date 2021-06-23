import MensajeDAO from '../models/mensajeSchema.js'
import mongoDBCnx from '../config/mongoDBCnx.js'

class Mensaje {

    constructor () {
        this.conection = new mongoDBCnx()
    }

       async add(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = await { ...req }
            await MensajeDAO.create(data);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res) {
        try {
            let msgInDb = await MensajeDAO.find();
            return res.status(200).json(msgInDb);
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }
}

export default Mensaje;