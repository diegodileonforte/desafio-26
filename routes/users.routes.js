import express from 'express'
import User from '../controllers/Users.js'
import passport from 'passport'
import { validate } from '../passport/auth.js'
const usersRoutes = express.Router()
const user = new User()

usersRoutes.get('/register', user.register)
usersRoutes.get('/main', validate, user.main)
usersRoutes.get('/logout', user.logout)
usersRoutes.get('/login', user.login)

usersRoutes.post('/register', passport.authenticate("register", {
    successRedirect: "/user/login",
    failureRedirect: "/user/register",
    failureFlash: true,
    successFlash: true
}))


usersRoutes.post('/login', passport.authenticate("login", {
    successRedirect: "/user/main",
    failureRedirect: "/user/login",
    failureFlash: true,
    successFlash: true
}))



export default usersRoutes;




