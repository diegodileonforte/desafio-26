import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import('./passport/passport.js')
import cluster from 'cluster';
import * as os from 'os'
const numCPUs = os.cpus().length;

import router from './routes/productos.routes.js'
import routerMsg from './routes/mensajes.routes.js'
import usersRoutes from './routes/users.routes.js'
import infoRouter from './routes/info.routes.js'
/* import randomsRouter from './routes/randoms.routes.js'; */

import Mensaje from './controllers/Mensaje.js'
import Producto from './controllers/Producto.js'
const msg = new Mensaje()
const prodClass = new Producto()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = parseInt(process.argv[2]) || config.PORT || 5000;

app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(flash())
app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.welcome = req.flash('welcome')
    next()
})

app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/api/productos', router)
app.use('/mensajes', routerMsg)
app.use('/user', usersRoutes)
app.use('/info', infoRouter)
/* app.use('/randoms', randomsRouter) */
app.get('/', function (req, res) { res.render('login') })

const chat = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    io.sockets.emit('new-message-server', chat)

    socket.on('new-message', async data => {
        const message = await data
        chat.push(data);
        msg.add({ message })
        io.sockets.emit('new-message-server', chat)
    })

    socket.on('new-producto', async data => {
        const producto = await data
        prodClass.add({ producto })
        io.sockets.emit('new-prod-server', producto)
    })

})

const server = servidor( 'CLUSTER' ) /*Completar según el servidor 'CLUSTER' || 'FORK'*/ 

function servidor(args) {
    if (args == 'FORK') {
        httpServer.listen(PORT, () => {
            console.log(`Servidor en Puerto ${PORT} - PID WORKER: ${process.pid}`)
            app.on("error", error => console.log(`Error en servidor ${error}`))
        })
    } else {
        if (cluster.isMaster) {
            console.log(numCPUs)
            console.log(`PID MASTER ${process.pid}`)

            for (let i = 0; i < numCPUs; i++) {cluster.fork()}

            cluster.on('exit', worker => {
                console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
                cluster.fork()
            })
        } else {
            app.listen(PORT, err => {
                if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
            })
        }
    }
}



