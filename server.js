import express from 'express'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import('./passport/passport.js')

import router from './routes/productos.routes.js'
import routerMsg from './routes/mensajes.routes.js'
import usersRoutes from './routes/users.routes.js'
import Mensaje from './controllers/Mensaje.js'
import Producto from './controllers/Producto.js'
const msg = new Mensaje()
const prodClass = new Producto()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080;

app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(flash())
app.use((req, res,next) => {
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

const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP escuchando en puerto ${server.address().port} **`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



