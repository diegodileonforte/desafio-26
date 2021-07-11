import express from 'express'
import User from '../controllers/Users.js'
import passport from 'passport'
/* import { validate } from '../passport/auth.js' */
const usersRoutes = express.Router()
const user = new User()

usersRoutes.get('/auth/facebook', passport.authenticate('facebook'))
usersRoutes.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/user/main',
    failureRedirect: '/user/login'
}))

usersRoutes.get('/register', user.register)
usersRoutes.get('/main', /* validate, */ user.main)
usersRoutes.get('/logout', user.logout)
usersRoutes.get('/login', user.login)


export default usersRoutes;




