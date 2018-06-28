'use strict'

const Model = use('Model')

class MultiLink extends Model {

  campaign() {
    return this.belongsTo('App/Models/MultiCampaign', 'campaign_id', 'id')
  }
}

module.exports = MultiLink
