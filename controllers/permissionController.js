const Permission = require("../models/permission");
const CustomError = require("../utils/customError");
const BigPromise = require("../middlewares/bigPromise");
const WhereClause = require("../utils/whereClause");

exports.addPermission = BigPromise(async (req, res, next) => {
  const permission = await Permission.create(req.body);
  
 return  res.status(200).json({
    status: true,
    permission,
    user: req.user._id,
    name: req.user.name,
  });
});


module.exports.getAllPermission = BigPromise(async (req, res) => {
  const resultPerPage = 6;
  const totalProductCount = await Permission.countDocuments();
  let productsObj = new WhereClause(Permission.find(), req.query)
    .search()
    .filter();

  productsObj.pager(resultPerPage);
  const products = await productsObj.base.clone();

  const filteredProductCount = products.length;

  return res.status(200).json({
    success: true,
    products,
    filteredProductCount,
    totalProductCount,
  });
});



module.exports.userPermission = BigPromise(async(req,res)=> {
  const permissionData = await Permission.find({"email":req.params.id});
  console.log(req.params.id)
  // res.send(req.params.id)
  if (!permissionData) {
    throw new CustomError("No Permission", 404);
  }
  return res.status(200).json({
    success: true,
    permissionData,
  });
})


module.exports.Permssion_comment = BigPromise(async (req, res) => {
  const { permissionId } = req.params;
  const { rating, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw new CustomError("Product not found", 404);
  }
  await permission.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
})