const MYSQL = require("../config/connection");
const getProducts = async (req, res) => {
  try {
    const categoryID = req && req.query && req.query.categoryID;
    const QUERY = `SELECT * FROM products WHERE categoryID = "${categoryID}"`;
    await MYSQL.query(QUERY, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Sorry, Something went wrong",
          code: "1",
        });
      }
      return res.status(200).json(result)
    });
  } catch (error) {
    console.log("Error in Get Products", error);
  }
};

module.exports = getProducts;
