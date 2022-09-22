const express = require("express")
const router = new express.Router()
const bodyParser = require('body-parser')
const createAccountController = require("../controllers/create-account")
const loginController = require("../controllers/login")
const getProductsController = require("../controllers/getProducts")
const getProfileController = require("../controllers/getProfileDetail")
const urlencodedParser = bodyParser.urlencoded({ extended: false })

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
router.get("/profile", (req, res) => {
    res.render("profile/profile")
})

router.get("/getproducts", urlencodedParser, getProductsController)
router.get("/getprofile", urlencodedParser, getProfileController)
router.post("/create-account", urlencodedParser, createAccountController)
router.post("/login", urlencodedParser, loginController)

router.get("*", (req, res) => {
    res.render("404/404")
})

module.exports = router