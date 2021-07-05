export default class User {

    async register(req, res) {
        res.render('register')
    }

    async login(req, res) {
        res.render('login')
    }

    async main(req, res) {
        res.render('main')
    }

    async logout(req, res) {
        req.logout()
        res.redirect('/user/login')
    }
}