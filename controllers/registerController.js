const userMdoal = require("../modal/user")
const userRegister = async (req, res) => {
    try{
        const {password, confirmpassword, firstname, lastname, email, phonenumber} = req.body
        let userId = await userMdoal.count()
        if(password !== confirmpassword){
            res.status(400).send("<h1>Password and confirm password does't match</h1>")
            return
        }
        let userRegister = new userMdoal({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phonenumber: phonenumber,
            password: password,
            confirmpassword: confirmpassword,
            userId: userId + 1 
        })
        await userRegister.save()
        res.status(200).redirect(`${process.env.BASE_URL}/account-created`)
    } catch(error){
        console.log(error);
        if(error.keyPattern.phonenumber){
            res.status(400).send("<h1>This phone is already registered</h1>")
        }else if(error.keyPattern.email){
            res.status(400).send("<h1>This email id is already registered</h1>")
        }else{
            res.status(400).send(`<h1>Something went wrong ${error}</h1>`)
        }
    }
}

module.exports = userRegister