import passport from 'passport'
import passportFacebook from 'passport-facebook'

const FacebookStrategy = passportFacebook.Strategy

import dotenv from 'dotenv'
dotenv.config()

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/info'
},
  async (accessesToken, refreshhToken, profile, done) => {
    const user = await UserService.find("dileonfortediego@gmail.com");
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  }
))

passport.serializeUser((user, done) => {
  done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
  const user = await UserService.find(username);
  done(null, user);
})

export default passport


/* passport.use('register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async function (req, username, password, done) {
  try {
    const { username, password } = req.body
    const userInDb = await UserDAO.findOne({ username: username })
    if (userInDb) {
      return done(null, false, req.flash('error', 'Usuario ya registrado'))
    } else {
      const newUser = new UserDAO({ username, password })
      newUser.password = await newUser.encryptPassword(password)
      await newUser.save();
      return done(null, newUser, req.flash('success','Usuario registrado con éxito'))
    }
  }
  catch (error) {
    console.log(error)
  }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const { username, password } = req.body
    const userRegistered = await UserDAO.findOne({ username: username })

    if (!userRegistered) {
      return done(null, false, req.flash('error', 'Usuario y/o Password inválido'))
    } else {
      const matchPassword = await userRegistered.checkPassword(password)
      if (matchPassword) {
        return done(null, userRegistered, req.flash('welcome', `${username}`))
      } else {
        return done(null, false, req.flash('error', 'Usuario y/o Password inválido'))
      }
    }
  } catch (error) {
    console.log(error)
  }
})); */