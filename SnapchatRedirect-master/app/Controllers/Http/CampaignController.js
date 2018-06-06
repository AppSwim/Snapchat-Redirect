'use strict'

const User = use('App/Models/User')
const Campaign = use('App/Models/Campaign')

class CampaignController {

    // POST
    // /campaigns
    // { ios_link, android_link, default_link, redirect_type, name, redirect_code }
    async createCampaign({ request, auth, params, view, response }) {
        var campaignData = request.only(['name', 'default_link'])
        const redirectData = request.only(['redirect_code'])

        if (request.only(['redirect_type']).redirect_type == 'SPLIT') {
            campaignData = {
                ...campaignData,
                ...request.only(['redirect_type', 'ios_link', 'android_link'])
            }
        } else {
            campaignData = {
                ...campaignData,
                redirect_type: 'NORMAL'
            }
        }
    
        try {
            const user = await auth.getUser()
            const campaign = await user.campaigns().create(campaignData)
            const redirect = await campaign.redirect().create(redirectData)
    
            response.redirect('/campaigns')
        } catch (e) {
            response.send(e)
        }
    }

    // POST
    // /campaigns/:id/edit
    // { ios_link, android_link, default_link, redirect_type, name, redirect_code }
    async updateCampaign({ request, auth, params, view, response }) {
        var campaignData = request.only(['name', 'default_link'])

        if (request.only(['redirect_type']).redirect_type == 'SPLIT') {
            campaignData = {
                ...campaignData,
                ...request.only(['redirect_type', 'ios_link', 'android_link'])
            }
        } else {
            campaignData = {
                ...campaignData,
                redirect_type: 'NORMAL'
            }
        }
        
        try {
            const user = await auth.getUser()
            const data = await User.query().where('id', user.id).with('campaigns', (builder) => {
                builder.where('id', params.id).with('redirect')
            }).fetch()

            const cD = data.toJSON()[0].campaigns[0]
            const campaign = await Campaign.find(cD.id)

            campaign.merge(campaignData)

            await campaign.save()
            response.redirect('/campaigns/' + params.id)
        } catch (e) {
            response.send(e)
        }
        
    }

    // GET
    // /campaigns
    async listCampaigns({ request, auth, params, view, response }) {
        const user = await auth.getUser()
        const campaigns = await user.campaigns().fetch()

        view.share({
            campaigns: campaigns.toJSON()
        })
        return view.render('Campaigns.listCampaigns')
    }

    // DELETE
    // /campaigns
    // { id }
    async deleteCampaign({ request, auth, params, response }) {
        const user = await auth.getUser()
        const data = await User.query().where('id', user.id).with('campaigns', (builder) => {
            builder.where('id', params.id).with('redirect')
        }).fetch()

        const campaignData = data.toJSON()[0].campaigns[0]
        const campaign = await Campaign.find(campaignData.id)
        await campaign.delete()

        response.redirect('/campaigns')
    }

    async showEditCampaign({ request, auth, params, view, response }) {
        const user = await auth.getUser()
        const data = await User.query().where('id', user.id).with('campaigns', (builder) => {
            builder.where('id', params.id).with('redirect')
        }).fetch()

        view.share({
            campaign: data.toJSON()[0].campaigns[0]
        })
        return view.render('Campaigns.editCampaign')
    }

    async showNewCampaign({ view }) {
        return view.render('Campaigns.newCampaign')
    }

    // GET
    // /campaign/:id
    async showCampaign({ response, auth, params, view, request }) {
        const user = await auth.getUser()
        const data = await User.query().where('id', user.id).with('campaigns', (builder) => {
            builder.where('id', params.id).with('redirect')
        }).fetch()

        view.share({
            campaign: data.toJSON()[0].campaigns[0]
        })
        return view.render('Campaigns.showCampaign')
    }

}

module.exports = CampaignController
