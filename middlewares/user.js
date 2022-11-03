const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BigPromise = require('./bigPromise');
const CustomError = require('../utils/customError');
const store = require("store2");

module.exports.isLoggedIn = BigPromise(async (req, res, next)=>{
  // req.cookies.token || 
  const token =  req.header('Authorization')?.replace('Bearer ', '');
  console.log(token)
  let email = req.header('email')
  let role = req.header('role')
  console.log("&&&&&",email,role)

  if(!token) {
    throw new CustomError("Unauthorized", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(email == decoded.email && role == decoded.role){
 
 
console.log("DDD+++",decoded)
  req.user = await User.findById(decoded.id);

  next();
}
else{
  
    throw new CustomError("Unauthorized", 401);

}

});

module.exports.customRole = (...roles) => BigPromise(async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new CustomError("Unauthorized route", 401);
  }
  next();
})

