'use strict'

const Model = use('Model')

class MultiCampaign extends Model {

  links() {
    return this.hasMany('App/Models/MultiLink','id','campaign_id')
  }

}

module.exports = MultiCampaign
