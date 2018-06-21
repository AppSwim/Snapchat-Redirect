'use strict'

const Model = use('Model')

class MultiLink extends Model {

  campaign() {
    return this.belongsTo('App/Models/MultiCampaign')
  }
}

module.exports = MultiLink
