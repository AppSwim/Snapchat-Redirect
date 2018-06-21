'use strict'

const Schema = use('Schema')

class MultiLinksSchema extends Schema {
  up() {
    this.create('multi_links', (table) => {
      table.increments()
      table.timestamps()

      table.integer('campaign_id').unsigned().references('id').inTable('multi_campaigns')
      table.string('short_link', 255).notNullable()
      table.string('default_link', 255).notNullable()

    })
  }

  down() {
    this.drop('multi_links')
  }
}

module.exports = MultiLinksSchema
