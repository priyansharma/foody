const JWT = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY

const authCreateTask = async (req, res, next) => {
    try{
        const isVerfiy = await JWT.verify(req.cookies.JWT, SECRET_KEY)
        if(!isVerfiy){
            res.redirect(`${process.env.BASE_URL}/`)
            return
        }
    }catch(error){
        res.send(`<h1>Something went wrong</h1> ${error}`)
    }
    next()
}

module.exports = authCreateTask