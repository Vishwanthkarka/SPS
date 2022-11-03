const express = require("express")
const router = require('express').Router();
const {addPermission,getAllPermission,getOnePermission,getOneProduct,userPermission} = require("../controllers/permissionController")

const {isLoggedIn, customRole} = require("../middlewares/user")

router.route("/user/permission/add").post(isLoggedIn,addPermission)
router.route("/allpermission").get(isLoggedIn,getAllPermission)
// router.route("/product/:id").get(getOneProduct);
router.route("/permission/:id").get((req,res,next)=> {res.send("hello")})
// router.route("/product").get(getOneProduct);
router.route("/user/permission/:id").get(isLoggedIn,userPermission) 
// app.get('/password/reset/:token', (req, res) => res.render('passwordReset', {token: req.params.token}));

module.exports = router;