export const up = knex => {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('password_hash').notNullable()
        table.boolean('is_verified').notNullable().defaultTo(false)
        table.timestamps(true, true) // created_at e updated_at com default now()
    })
}

export const down = knex => {
    return knex.schema.dropTable('users')
}