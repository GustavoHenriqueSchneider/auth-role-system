export const up = knex => {
    return knex.schema.createTable('user_roles', (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNullable()
        table.integer('role_id').unsigned().notNullable()

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE')

        table.unique(['user_id', 'role_id']) // impede papéis duplicados
    })
}

export const down = knex => {
    return knex.schema.dropTable('user_roles')
}