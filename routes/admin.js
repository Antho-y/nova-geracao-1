require('dotenv').config()
const express = require('express')
const connection = require('../connection')

const router = express.Router()

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