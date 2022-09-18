const MYSQL = require("../config/connection");
const loginController = async (req, res) => {
  try {

    const GET_ACCCOUNT = `select * from users where email = '${req.body.email}'`;
    await MYSQL.query(GET_ACCCOUNT, (err, result) => {
      const parsedResult = JSON.parse(JSON.stringify(result))
      if (err) {
        return res.status(500).json({
            message: "Sorry, Something went wrong",
            code: "1"
        });
      }else if (result.length <= 0) {
        return res.status(400).json({
            message: "Account doesn't exist by this email",
            code: "2"
        });
      }else if(req.body.password !== parsedResult[0].userPassword){
        return res.status(400).json({
            message: "Incorrect login details",
            code: "3"
        });
      }else{
        return res.status(200).json({
            message: "succeed",
            code: "0",
            name: parsedResult[0].firstName,
            userID: parsedResult[0].userID
        });
      }
    });
  } catch (error) {
    console.log("Error in Login", error);
  }
};
module.exports = loginController;
