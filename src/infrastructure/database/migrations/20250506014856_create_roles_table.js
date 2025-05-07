export const up = knex => {
  return knex.schema.createTable('roles', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
      .unique()
  })
}

export const down = knex => knex.schema.dropTable('roles')