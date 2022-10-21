const express = require("express")
const router = require('express').Router();
const {addPermission,getAllPermission} = require("../controllers/permissionController")

const {isLoggedIn, customRole} = require("../middlewares/user")

router.route("/user/permission/add").post(isLoggedIn,addPermission)
router.route("/allpermission").get(isLoggedIn,getAllPermission)

module.exports = router;