'use strict'

const User = use('App/Models/User')

class AuthenticationController {

    // POST
    // /user
    // { username, password, email }
    async createUser({ request, params, response }) {
        const userData = request.only(['username', 'password', 'email'])
        const user = await User.create(userData) 
        response.redirect('/')
    }

    async loginUser({ request, auth, params, session, view, response }) {
        const { email, password } = request.only(['email', 'password'])

        try {
            await auth.check()
            return "Already logged in"
        } catch (e) {
            
        }

        try {
            await auth.remember(true).attempt(email, password)
            response.redirect('/campaigns')
        } catch (e) {
            session.flash({ notif: 'Invalid email and/or password.' })
            response.redirect('/login')
        }
    }

    async logout({ request, auth, view, response }) {
        try {
            await auth.logout()
        } catch (e) {

        }

        response.redirect('/')
    }

    async displayLogin({ request, auth, view, response }) {
        try {
            await auth.check()
            response.redirect('/campaigns')
        } catch (e) {
            return view.render('Authentication.login')
        }
    }

    async displayRegister({ request, auth, view, response }) {
        try {
            await auth.check()
            response.redirect('/campaigns')
        } catch (e) {
            return view.render('Authentication.createUser')
        }
    }

}

module.exports = AuthenticationController
