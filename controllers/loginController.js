const registerModal = require("../modal/user")
const bcrypt = require("bcrypt")
const loginController = async  (req, res) => {
    try{
        let getAccount = await registerModal.findOne({email: req.body.email})
        if(getAccount){
            let matchPassword = await bcrypt.compare(req.body.password, getAccount.password)
            if(matchPassword){
                const getToken = await getAccount.genrateJwtToken()
                res.status(200).cookie('JWT', getToken, {secure: true}).cookie('ID', getAccount.userId).redirect(`${process.env.BASE_URL}/dashboard`)
            }else{
                res.status(400).send("<h1>Your password dose't match</h1>")
            }
        }else{
            res.status(400).send("<h1> We don't have any account with your email id </h1>")
        }
    } catch(error){
        console.log(`Error from login controller ${error}`)
    }
}

module.exports = loginController