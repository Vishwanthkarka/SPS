const express = require("express")
const router = require('express').Router();
const {addPermission,getAllPermission,getOnePermission,getOneProduct} = require("../controllers/permissionController")

const {isLoggedIn, customRole} = require("../middlewares/user")

router.route("/user/permission/add").post(isLoggedIn,addPermission)
router.route("/allpermission").get(isLoggedIn,getAllPermission)
// router.route("/product/:id").get(getOneProduct);
router.route("/permission/:id").get((req,res)=> {res.send(req.params.id)})
router.route("/product").get(getOneProduct);
// app.get('/password/reset/:token', (req, res) => res.render('passwordReset', {token: req.params.token}));

module.exports = router;