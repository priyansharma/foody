const MYSQL = require("../config/connection")
const getProfileDetail = async (req, res) => {
    try{
        const userID = req && req.query && req.query.userID
        const QUERY = `SELECT * FROM users WHERE userID = '${userID}'`
        await MYSQL.query(QUERY, (err, result) => {
            console.log(result)
            if(err){
                return res.status(500).json({
                    message: "Sorry, Something went wrong",
                    code: "1"
                });        
            }else if(result.length <= 0){
                return res.status(400).json({
                    message: "Sorry, Something went wrong",
                    code: "1"
                });
            }
            return res.status(200).json(result)
        })
    }catch(error){
        console.log("Error in Get Profile", error)
        return res.status(500).json({
            message: "Sorry, Something went wrong",
            code: "1"
        });
    }
}
module.exports = getProfileDetail;