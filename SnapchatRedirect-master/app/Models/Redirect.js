'use strict'

const Model = use('Model')

class Redirect extends Model {

    campaign () {
        return this.belongsTo('App/Models/Campaign')
    }
    
}

module.exports = Redirect
