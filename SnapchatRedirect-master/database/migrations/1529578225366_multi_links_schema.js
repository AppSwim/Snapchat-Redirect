'use strict'

const Schema = use('Schema')

class MultiLinksSchema extends Schema {
  up() {
    this.create('multi_links', (table) => {
      table.increments()
      table.timestamps()

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('campaign_id').unsigned().references('id').inTable('multi_campaigns')
      table.string('short_link', 255).notNullable().unique()
      table.string('default_link', 255).notNullable().unique()

    })
  }

  down() {
    this.drop('multi_links')
  }
}

module.exports = MultiLinksSchema
