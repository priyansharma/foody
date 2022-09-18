const MYSQL = require("../config/connection");
const createAccount = async (req, res) => {
  try {
    const { userID, firstName, lastName, email, mobileNumber, userPassword } = req.body;
    const QUERY = `INSERT INTO users (userID, firstName, lastName, email, mobileNumber, userPassword) VALUES ( "${userID}", "${firstName}", "${lastName}", "${email}", "${mobileNumber}", "${userPassword}")`;
    await MYSQL.query(QUERY, (err, result) => {
      if (err) {
        res.sendStatus(400).send("Error in create Account");
      }
      res.sendStatus(200);
    });
  } catch (err) {
    console.log("From create-account controller", err);
  }
};

module.exports = createAccount;
