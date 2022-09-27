const MYSQL = require("../config/connection");
const savePaymentandOrder = async (req, res) => {
    try{
        console.log("reqqq", req.body)
        const {orderID, userID, productID, categoryID, payableAmount, additionalCharges, deliveryAddress, contactNumber, modeOfPay, addintionlItems} = req.body;

        const QUERY = `INSERT INTO orders (orderID, userID, productID, categoryID, payableAmount, additionalCharges, deliveryAddress, contactNumber,  modeOfPay, addintionlItems)
        VALUES ('${orderID}', '${userID}', '${productID}', '${categoryID}', '${payableAmount}', '${additionalCharges}', '${deliveryAddress}', '${contactNumber}', '${modeOfPay}', '${addintionlItems}')`

        await MYSQL.query(QUERY, (error, result) => {
            if(error){
                return res.status(500).json({
                    message: "Sorry, Something went wrong",
                    code: "1"
                });
            }
            return res.status(200).json({
                message: "order placed",
                code: "0",
                orderID: orderID
            })
        })
    }catch(err){
        console.log("Error in payment", err)
    }
}

module.exports = savePaymentandOrder;