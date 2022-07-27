const express = require("express")
const router = new express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')
const makeTodos = require('../controllers/makeTodoController')
const authentication = require('../middleware/authentication')
const getUserDataController = require("../controllers/getUserDataController")
const taskDeleteController = require("../controllers/taskDeleteController")

router.get("/", (req, res) => {
    res.render("home/home")
})
router.get('/login', (req, res) => {
    res.render('login/login')
})
router.get("/signup", (req, res) => {
    res.render("signup/signup")
})
router.get("/product", (req, res) => {
    res.render("product/product")
})
router.get("/confirmation", (req, res) => {
    res.render("confirmation/confirmation")
})
router.get("/cart", (req, res) => {
    res.render("cart/cart")
})
router.get("/payment", (req, res) => {
    res.render("payment/payment")
})
router.get("/profile", (req, res) => {
    res.render("profile/profile")
})
router.post("/login", urlencodedParser, loginController)
router.post("/register", urlencodedParser, registerController)
router.post("/create", urlencodedParser, authentication, makeTodos)
router.get("/getdata", urlencodedParser, getUserDataController)
router.delete("/taskdelete", authentication, taskDeleteController)

router.get("*", (req, res) => {
    res.render("404/404")
})

module.exports = router