'use strict'

const User = use('App/Models/User')
const Campaign = use('App/Models/Campaign')
const Redirect = use('App/Models/Redirect')
const UAParser = require('ua-parser-js')

class RedirectController {

    // /c/:rdcode
    async executeRedirect({ request, params, view, response }) {
        try {
            const redirect = await Redirect.findBy('redirect_code', params.rdcode)
            const campaign = await redirect.campaign().fetch()

            const osName = UAParser(request.header('User-Agent')).os.name
            let redirect_url = "", logo_url = "",  default_redirect_url = "", app_name = ""
            if (campaign.redirect_type == 'SPLIT') {
                if (osName === "iOS") {
                    redirect_url = campaign.ios_link 
                } else if (osName === "Android") {
                    redirect_url = campaign.android_link 
                } else {
                    redirect_url = campaign.default_link 
                }
            } else {
                redirect_url = campaign.default_link
            }
            default_redirect_url = campaign.default_link
            logo_url = campaign.logo_url
            app_name = campaign.name
            let obj = {
                redirect_url, default_redirect_url, logo_url, app_name
            }

            view.share(obj)

            return view.render('Redirect.redirect')
        } catch (e) {
            response.send('404 - Redirect not found')
        }
    }

    // /c/:rdcode/no-redirect
    async noRedirectCookie({ view }) {
        return view.render('Redirect.no-redirect')
    }
  
    // POST
    // /campaigns/:id/redirect
    // { redirect_code }
    async changeCampaignRedirect({ request, auth, params, view, response }) {    
        try {
            const user = await auth.getUser()
            const data = await User.query().where('id', user.id).with('campaigns', (builder) => {
                builder.where('id', params.id).with('redirect')
            }).fetch()
        

            if (data.toJSON()[0].campaigns[0].redirect !== null) {
                const redirect_id = data.toJSON()[0].campaigns[0].redirect.id
                
                const redirect = await Redirect.find(redirect_id)
                const new_redirect_code = request.only(['redirect_code'])['redirect_code']
                redirect.redirect_code = new_redirect_code
                await redirect.save()

                response.send('200 - New code: ' + redirect.redirect_code)
            }
            
            return data
        } catch (e) {
            response.send('401 - Unauthorized')
        }
    }

    // POST
    // /campaigns/:id/redirect/new
    // { redirect_code }
    async createCampaignRedirect({ request, auth, params, view, response }) {
        try {
            const user = await auth.getUser()
            const data = await User.query().where('id', user.id).with('campaigns', (builder) => {
                builder.where('id', params.id).with('redirect')
            }).fetch()

            if (data.toJSON()[0].campaigns[0].redirect == null) {
                const campaign_id = data.toJSON()[0].campaigns[0].id
                const campaign = await Campaign.find(campaign_id)
                const redirect = await campaign.redirect().create(request.only(['redirect_code']))

                response.send('200 - Created redirect: ' + redirect.toJSON())
            } else {
                response.send('400 - Campaign has redirect')
            }
        } catch (e) {
            response.send('401 - Unauthorized')
        }
    }

}

module.exports = RedirectController
