'use strict'

const Schema = use('Schema')

class RedirectSchema extends Schema {
  up () {
    this.create('redirects', (table) => {
      table.increments()
      table.timestamps()
      table.integer('campaign_id').unsigned().references('id').inTable('campaigns')
      table.string('redirect_code', 80).unique().notNullable()
    })
  }

  down () {
    this.drop('redirects')
  }
}

module.exports = RedirectSchema
