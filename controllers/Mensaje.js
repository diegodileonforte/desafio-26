import MensajeDAO from '../models/mensajeSchema.js'
import mongoDBCnx from '../config/mongoDBCnx.js'
import { normalize } from 'normalizr'
import { schema } from 'normalizr'
import logger from '../config/winston.js'

class Mensaje {

    constructor() {
        this.conection = new mongoDBCnx()
    }

    async add(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = await { ...req }
            const mensaje = {
                author: {
                    email: data.mensajes.author.email,
                    nombre: data.mensajes.author.nombre,
                    apellido: data.mensajes.author.apellido,
                    edad: data.mensajes.author.edad,
                    alias: data.mensajes.author.alias,
                    avatar: data.mensajes.author.avatar
                },
            }
            mensaje.text = data.mensajes.text
            await MensajeDAO.create(mensaje)

        } catch (error) {
            logger.error.error(`Error en mensaje ${error.message}`)
        }
    }

    async getAll(req, res) {
        try {
            let mensajes = await MensajeDAO.find()
            let id = 'mensajes'
            return res.status(200).json({ id, mensajes });
        } catch (error) {
            logger.error.error(`Error en mensaje ${error.message}`)
        }
    }

    async normalizedData(req, res) {
        try {
            let mensajes = await MensajeDAO.find()

            let msgOriginal = {
                id: 'mensajes',
                mensajes: mensajes.map(mensaje => ({ ...mensaje._doc }))
            }

            const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' })

            const schemaMensaje = new schema.Entity('mensaje', {
                author: schemaAuthor
            }, { idAttribute: '_id' })

            const schemaMensajes = new schema.Entity('mensajes', {
                mensajes: [schemaMensaje]
                
            }, { idAttribute: 'id' })

            let normalizedData = normalize(msgOriginal, schemaMensajes);

            res.send(normalizedData)

        } catch (error) {
            logger.error.error(`Error en mensaje ${error.message}`)
        }

    }
}

export default Mensaje;