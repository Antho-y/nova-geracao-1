require('dotenv').config()
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const auth = req.headers['authorization']
    const token = auth && auth.split(' ')[1]
    
    if(token === undefined) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY, (err, response) => {
        if(err) return res.sendStatus(403)
        res.locals = response
        next()
    })
}

module.exports = { auth }