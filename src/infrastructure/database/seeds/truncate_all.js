export async function seed(knex) {
  await knex.raw(`
    TRUNCATE TABLE 
      user_roles, 
      users, 
      roles
    RESTART IDENTITY CASCADE
  `)
}