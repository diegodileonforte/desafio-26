import ProductoDAO from '../models/productoSchema.js'

class Producto {

    async add(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = {
                title: req.producto.title,
                price: req.producto.price,
                thumbnail: req.producto.thumbnail
            }
            await ProductoDAO.create(data)

        } catch (error) {
            console.log(error)
        }
    }

    async getAll(req, res) {
        try {
            const prodInDb = await ProductoDAO.find({})
            return res.status(200).json(prodInDb)

        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    async getById(req, res) {
        const id = req.params.id
        try {
            if (id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado', error })
            }
            const prodById = await ProductoDAO.findOne({ id })
            if (!prodById) { return res.status(404).json({ mensaje: 'No se encontró el producto' }) }
            return res.status(200).json(prodById)

        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    async delete(req, res) {
        const id = req.params.id
        try {
            if (id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado' })
            }
            const prodToDel = await ProductoDAO.deleteOne({ id })
            if (!prodToDel) { return res.status(404).json({ mensaje: 'Producto no encontrado' }) }
            return res.status(200).json({ mensaje: 'Producto eliminado con exito' })
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    async update(req, res) {
        const id = req.params.id
        const data = { ...req.body }
        try {
            const prodUpdated = await ProductoDAO.updateOne({ id }, data, { new: true })
            return res.status(200).json({ prodUpdated, mensaje: 'Producto actualizado' })
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }
}

export default Producto
