'use strict'

const Schema = use('Schema')

class MultiCampaignsSchema extends Schema {
  up () {
    this.create('multi_campaigns', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('name', 255).notNullable()
      table.string('title', 255).notNullable()
      table.string('logo_url', 255).notNullable()
    })
  }

  down () {
    this.drop('multi_campaigns')
  }
}

module.exports = MultiCampaignsSchema
