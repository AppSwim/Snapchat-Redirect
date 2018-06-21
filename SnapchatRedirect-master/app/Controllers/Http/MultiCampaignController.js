'use strict'

const User = use('App/Models/User')
const Campaign = use('App/Models/MultiCampaign')

class MultiCampaignController {

  // POST
  // /mcampaigns
  async createCampaign({request, auth, params, view, response}) {
    const campaignData = request.only(['name', 'title', 'logo_url'])
    const user = await auth.getUser()
    const campaign = await user.multiCampaigns().create(campaignData)
    response.redirect('/mcampaigns')
  }

  // POST
  // /mcampaigns/:id/edit
  async updateCampaign({request, auth, params, view, response}) {
    const campaignData = request.only(['name', 'title', 'logo_url'])
    const user = await auth.getUser()
    const campaign = await Campaign.query()
      .where({
        user_id: user.id,
        id: params.id
      })
      .first()

    campaign.merge(campaignData)

    await campaign.save()
    response.redirect('/mcampaigns/' + params.id)
  }

  // GET
  // /campaigns
  async listCampaigns({request, auth, params, view, response}) {
    const user = await auth.getUser()
    const campaigns = await user.multiCampaigns().fetch()

    view.share({
      campaigns: campaigns.toJSON()
    })

    return view.render('MultiCampaigns.listCampaigns')
  }

  // DELETE
  // /campaigns
  // { id }
  async deleteCampaign({request, auth, params, response}) {
    const user = await auth.getUser()

    const campaign = await Campaign.query()
      .where({
        id: params.id,
        user_id: user.id
      })
      .first()

    await campaign.delete()

    response.redirect('/mcampaigns')
  }

  async showEditCampaign({request, auth, params, view, response}) {
    const user = await auth.getUser()
    const campaign = await Campaign.query()
      .where({
        id: params.id,
        user_id: user.id
      })
      .first()

    view.share({
      campaign: campaign
    })
    return view.render('MultiCampaigns.editCampaign')
  }

  async showNewCampaign({view}) {
    return view.render('MultiCampaigns.newCampaign')
  }

  // GET
  // /campaign/:id
  async showCampaign({response, auth, params, view, request}) {
    const user = await auth.getUser()
    const campaign = await Campaign.query()
      .where({
        id: params.id,
        user_id: user.id
      })
      .first()

    view.share({
      campaign: campaign
    })
    return view.render('MultiCampaigns.showCampaign')
  }

}

module.exports = MultiCampaignController
