const Permission = require("../models/permission");
const CustomError = require("../utils/customError");
const BigPromise = require("../middlewares/bigPromise");
const WhereClause = require("../utils/whereClause");

exports.addPermission = BigPromise(async (req, res, next) => {
  const permission = await Permission.create(req.body);
  
  res.status(200).json({
    status: true,
    permission,
    user: req.user._id,
    name: req.user.name,
  });
});

// exports.getAllPermission = BigPromise(async (req, res, next) => {
//   const resultPerPage = 6;
//   const totalCountProduct = await Permission.countDocuments(); 
//   const permissionObj = new WhereClause(Permission.find(), req.query)
//     .search()
//     .filter();
//   let permissions = await permissionObj.base;
//   const filteredProductNumber = permissions.length;

//   // permission.limit().skip()
//   permissionObj.pager(resultPerPage);
//   permissions = await permissions.base;
//   res.status(200).json({
//     status: true,
//     permissions,
//     // permissionObj,
//     filteredProductNumber,
//     totalCountProduct,
//   });
// });

module.exports.getAllPermission = BigPromise(async (req, res) => {
  const resultPerPage = 6;
  const totalProductCount = await Permission.countDocuments();

  let productsObj = new WhereClause(Permission.find(), req.query)
    .search()
    .filter();

  productsObj.pager(resultPerPage);
  const products = await productsObj.base.clone();

  const filteredProductCount = products.length;

  res.status(200).json({
    success: true,
    products,
    filteredProductCount,
    totalProductCount,
  });
});

module.exports.getOnePermission = BigPromise(async (req, res) => {
  res.send("hello123")
  
  console.log("hoss,,s")
  const product = await Product.findById(req.params.id);
res.send("hello")
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getOneProduct = BigPromise(async (req, res) => {
  res.send("fjjjf")
  // const product = await Permission.findById(req.params.id);

  // if (!product) {
  //   return next(new CustomError("No product found with this id", 401));
  // }
  res.status(200).json({
    success: true,
    // product,
  });
});

module.exports.userPermission = BigPromise(async(req,res)=> {
  const perm = await Product.findById(req.params.productId);
  if (!product) {
    throw new CustomError("No Permission", 404);
  }
  res.status(200).json({
    
    success: true,
    perm,
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