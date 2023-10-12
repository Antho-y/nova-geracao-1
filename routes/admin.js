require('dotenv').config()
const express = require('express')
const connection = require('../connection')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signin-admin', (req, res) => {
    let admin = req.body
    let query = "SELECT Login, Senha, Papel FROM tbl_Admin WHERE Login = ?"
    connection.query(query, [admin.login], (err, results) => {
        if(!err) {
            if(results.length <= 0 || results[0].Senha != admin.senha) {
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

router.post('/signup-aluno', (req, res) => {
    const aluno = req.body
    let query = 'SELECT Login, Senha, Papel FROM tbl_Aluno WHERE Login = ?'
    connection.query(query, [aluno.login], (err, results) => {
        if(!err) {
            if(results.length <= 0) {
                query = "INSERT INTO tbl_Aluno VALUES (NULL, ?, ?, 'aluno')"
                connection.query(query, [aluno.login, aluno.senha], (err, results) => {
                    if(!err) {
                        return res.status(200).json({ message: 'Aluno registrado com sucesso.' })
                    } else {
                        return res.status(500).json(err)
                    }
                }) 
            } else {
                return res.status(400).json({ message: 'O login inserido já existe.' })
            }
        } else {
            return res.status(500).json(err)
        }
    })
})

router.post('/signup-professor', (req, res) => {
    const professor = req.body
    let query = 'SELECT Login, Senha, Papel FROM tbl_Professor WHERE Login = ?'
    connection.query(query, [professor.login], (err, results) => {
        if(!err) {
            if(results.length <= 0) {
                query = "INSERT INTO tbl_Professor VALUES (NULL, ?, ?, 'professor')"
                connection.query(query, [professor.login, professor.senha], (err, results) => {
                    if(!err) {
                        return res.status(200).json({ message: 'Professor registrado com sucesso.' })
                    } else {
                        return res.status(500).json(err)
                    }
                }) 
            } else {
                return res.status(400).json({ message: 'O login inserido já existe.' })
            }
        } else {
            return res.status(500).json(err)
        }
    })
})

module.exports = router