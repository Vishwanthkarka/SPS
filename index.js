require('dotenv').config();
const app = require("./app");
const connectDB = require('./config/db');
const path = require('path')
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');

// Database connection
connectDB();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT, ()=>{
  console.log(`Listening to port: ${process.env.PORT}`)
})