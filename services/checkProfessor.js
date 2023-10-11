require('dotenv').config()

const checkProfessor = (req, res, next) => {
    console.log(res.locals)
    if(res.locals.papel === process.env.PROFESSOR ) {
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports = { checkProfessor }