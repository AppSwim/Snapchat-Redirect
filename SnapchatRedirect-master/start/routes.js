'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const UAParser = require('ua-parser-js')

const User = use('App/Models/User')
const Campaign = use('App/Models/Campaign')
const Redirect = use('App/Models/Redirect')

Route.get('/', async ({ auth, response }) => {
    try {
        await auth.check()
        response.redirect('/campaigns')
    } catch (e) {
        response.redirect('/login')
    }
}) 

Route.get('/register', 'AuthenticationController.displayRegister')
Route.post('/register', 'AuthenticationController.createUser')

Route.get('/logout', 'AuthenticationController.logout')

Route.get('/login', 'AuthenticationController.displayLogin')
Route.post('/login', 'AuthenticationController.loginUser')

Route.get('/c/:rdcode', 'RedirectController.executeRedirect')
Route.get('/c/:rdcode/no-redirect', 'RedirectController.noRedirectCookie')

Route.get('/campaigns', 'CampaignController.listCampaigns').middleware('auth')
Route.post('/campaigns', 'CampaignController.createCampaign').middleware('auth')
Route.get('/campaigns/new', 'CampaignController.showNewCampaign').middleware('auth')

Route.get('/campaigns/:id', 'CampaignController.showCampaign').middleware('auth')

Route.get('/campaigns/:id/edit', 'CampaignController.showEditCampaign').middleware('auth')
Route.post('/campaigns/:id/edit', 'CampaignController.updateCampaign').middleware('auth')

Route.post('/campaigns/:id/delete', 'CampaignController.deleteCampaign').middleware('auth')

Route.post('/campaigns/:id/redirect', 'RedirectController.changeCampaignRedirect').middleware('auth')
Route.post('/campaigns/:id/redirect/active', 'RedirectController.changeActiveState').middleware('auth')