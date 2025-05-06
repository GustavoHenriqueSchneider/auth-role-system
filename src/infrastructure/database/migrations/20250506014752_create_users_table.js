export const up = knex => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('password_hash').notNullable()
        table.boolean('is_verified').notNullable().defaultTo(false)
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').nullable()
    })
}

export const down = knex => knex.schema.dropTable('users')