'use strict'

const Campaign = use('App/Models/Campaign')
const Link = use('App/Models/MultiLink')

class MultiLinkController {

  async redirect({request, params, view, response}) {
    const link = await Link.findBy('short_link', params.short_link)
    const campaign = await link.campaign().fetch()

    view.share({
      app_name: campaign.title || '',
      logo_url: campaign.logo_url || '',
      redirect_url: link.default_link || '',
      default_redirect_url: link.default_link || '',
    })

    return view.render('Redirect.redirect')
  }
}

module.exports = MultiLinkController
