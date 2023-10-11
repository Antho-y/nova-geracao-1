require('dotenv').config()
const express = require('express')
const connection = require('../connection')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signin-aluno', (req, res) => {
    let aluno = req.body
    let query = "SELECT Login, Senha, Papel FROM tbl_Aluno WHERE Login = ?"
    connection.query(query, [aluno.login], (err, results) => {
        if(!err) {
            if(results.length <= 0 || results[0].Senha != aluno.senha) {
                return res.status(400).json({ message: "Login ou senha incorreta." })
            } else {
                const response = { papel: results[0].Papel }
                const token = jwt.sign(response, process.env.SECRET_KEY, { expiresIn: '4h' })
                return res.status(200).json({ token })
            }
        } else {
            return res.status(500).json(err)
        }
    })
})

module.exports = router