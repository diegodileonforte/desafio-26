import * as os from 'os'
const numCPUs = os.cpus().length;

export default class Info {

    getInfo(req, res) {

        res.render('info', {
            argumento: process.argv,
            plataforma: process.platform,
            version: process.version,
            memoria: process.memoryUsage(),
            path: process.execPath,
            proceso: process.pid,
            carpeta: process.cwd(),
            procesadores: numCPUs
        })
    }
}