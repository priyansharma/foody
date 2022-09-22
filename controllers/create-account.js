const MYSQL = require("../config/connection");
const createAccount = async (req, res) => {
  try {
    const { userID, firstName, lastName, email, mobileNumber, userPassword } = req.body;
    const QUERY = `INSERT INTO users (userID, firstName, lastName, email, mobileNumber, userPassword) VALUES ( "${userID}", "${firstName}", "${lastName}", "${email}", "${mobileNumber}", "${userPassword}")`;
    await MYSQL.query(QUERY, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Sorry, Something went wrong",
          code: "1"
        });
      }
      res.sendStatus(200);
    });
  } catch (err) {
    console.log("From create-account controller", err);
    return res.status(500).json({
      message: "Sorry, Something went wrong",
      code: "1",
    });
  }
};

module.exports = createAccount;
