const router = require('express').Router();

const passport = require("passport")


router.get("/login", (req, res) => {
    res.render("signin");
  });
// router.get("/callback",passport.authenticate("google"), (req, res) => {
//     res.send("google callback")
   
//   });

  router.get("/callback", passport.authenticate("google"), (req, res) => {
    res.send("hello");
    console.log("login with google ")
  });

  router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.send(req.user);
  });

router
.get("/lo",passport.authenticate('google',{
scope:['profile','email']
}), (req,res) => {
res.send(req.user)
})


router.get("/log", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});


router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;