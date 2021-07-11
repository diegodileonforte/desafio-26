import { fork } from 'child_process'
import logger from '../config/winston.js';

export default class Random {

    getRandom(req, res) {
        res.render('random')
    }

    async getNumber(req, res) {
        let param = await req.query.number
        try {
            const child = fork('../desafio-26/helpers/n.js');
            child.send('number', parseInt(param) );
            child.on('message', data => res.send(data));
            child.exit();
        } catch (error) {
            logger.error.error(`Error en randoms ${error.message}`)
        }
    }

}