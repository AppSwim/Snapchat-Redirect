'use strict'

const Link = use('App/Models/MultiLink')
const NotFound = use('App/Exceptions/NotFoundException')

class MultiLinkController {

  async prepareView(request, params, view) {
    const link = await Link.findBy('short_link', params.short_link)
    if (!link) {
      throw new NotFound()
    }
    const campaign = await link.campaign().fetch()

    if (!campaign) {
      throw new NotFound()
    }

    view.share({
      app_name: campaign.title || '',
      logo_url: campaign.logo_url || '',
      redirect_url: link.default_link || '',
      default_redirect_url: link.default_link || '',
    })
  }

  async redirect({request, params, view, response}) {
    await this.prepareView(request, params, view)

    return view.render('NewRedirect.redirect')
  }

  async preview({request, params, view, response}) {
    return view.render('NewRedirect.preview', {
      short_link: params.short_link
    })
  }
}

module.exports = MultiLinkController
