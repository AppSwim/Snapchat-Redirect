'use strict'

const Schema = use('Schema')

class RunSchema extends Schema {
  up () {
    this.create('runs', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('runs')
  }
}

module.exports = RunSchema
