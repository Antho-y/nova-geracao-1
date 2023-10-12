const express = require('express')
let cors = require('cors')
const path = require('path')

const admin_route = require('./routes/admin')
const aluno_route = require('./routes/aluno')
const professor_route = require('./routes/professor')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', admin_route)
app.use('/aluno', aluno_route)
app.use('/professor', professor_route)

app.use('/pages/professor', express.static(path.join(__dirname, 'professor')))
app.use('/pages/aluno', express.static(path.join(__dirname, 'aluno')))
app.use('/pages/admin', express.static(path.join(__dirname, 'admin')))

module.exports = app