const userDataModel = require("../modal/userData")

const getData = async (req, res) => {
    try{
        const userIdCookie = req.cookies.ID
        const getUserData = await userDataModel.findOne({userID: userIdCookie})
        res.send(getUserData).status(200)
    }catch(error){
        console.log(`Error in get user data ${error}`);
        res.json(`<h1>Sorry! Something went wrong ${error} </h1>`)
    }
}

module.exports = getData