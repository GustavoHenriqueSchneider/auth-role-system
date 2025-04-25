import express from 'express'
import auth from './src/routes/auth.js'
import logs from './src/routes/logs.js'
import roles from './src/routes/roles.js'
import users from './src/routes/users.js'

const app = express()

app.use(express.json())

app.use('/auth', auth)
app.use('/logs', logs)
app.use('/roles', roles)
app.use('/users', users)

app.listen(3000, () => {
    console.log(`running`)
})