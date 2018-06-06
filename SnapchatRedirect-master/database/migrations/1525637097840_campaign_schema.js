'use strict'

const Schema = use('Schema')

class CampaignSchema extends Schema {
  up () {
    this.create('campaigns', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 80).notNullable()
      table.string('ios_link', 255)
      table.string('android_link', 255)
      table.string('default_link', 255).notNullable()

      // 'NORMAL' or 'SPLIT' redirects
      table.string('redirect_type').notNullable().defaultsTo('NORMAL')
      // -- 
    })
  }

  down () {
    this.drop('campaigns')
  }
}

module.exports = CampaignSchema
