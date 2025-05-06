export async function seed(knex) {
  console.log('→ Limpando tabela roles')
  await knex('roles').del()

  console.log('→ Inserindo dados na tabela roles')
  await knex('roles').insert([
    { name: 'admin' },
    { name: 'user' }
  ])

  console.log('✅ Seed executada com sucesso')
}