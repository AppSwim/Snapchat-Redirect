'use strict'

const Model = use('Model')

class Campaign extends Model {

    redirect () {
        return this.hasOne('App/Models/Redirect')
    }

}

module.exports = Campaign
