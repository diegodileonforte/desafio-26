import mongoose from 'mongoose';

export default class mongoDBCnx {

    constructor() {
        this.connection = this.createConnection()
    }

    createConnection() {
        const uri = 'mongodb://localhost:27017/ecommerce'
        const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
        mongoose.connect(uri, options)
            .then(err => { err }
            )
    }
}

