require('dotenv').config()

const checkAdmin = (req, res, next) => {
    console.log(res.locals)
    if(res.locals.papel === process.env.ADMIN ) {
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports = { checkAdmin }