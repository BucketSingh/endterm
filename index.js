const express = require("express");  
const multer  = require("multer");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

// using path;

app.use(express.static("public"));
// app.get("/",(req,res)=>{
//    res.sendFile(path.join(__dirname,"/public/mainpage.html"));
// })

//session
app.use(cookieParser());
app.use(session({
    secret:"fdfhgds",
    saveUninitialized:true,
    resave: true,
    cookie:{maxAge:30000}
}))

app.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect("/mainpage");
    }else{
    res.render("login",{user:null});
    }
}
)

app.get("/mainpage",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/mainpage.html"));
})
app.get("/login",(req,res)=>{
    const username=req.body.name;
    console.log(username);
    console.log(req.body);
    req.session.name  = username;
    res.render("login",{user:req.session.name});
})

app.post("/login",(req,res)=>{
    const username=req.body.name;
    console.log(username);
    console.log(req.body);
    req.session.name  = username;
      res.render("login",{user:req.session.name});
})


app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("YOu have been logged out");
})

app.listen(port,(err)=>{
    if(err){
        console.log("Cannot Connect to the port");
        }
        else{
    console.log("Server is listening to port:3000 ");
        }
})




    
// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
    
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic");       
  
app.get("/",function(req,res){
    res.render("Signup");
})
    
app.post("/uploadProfilePicture",function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            res.send("Success, Image uploaded!")
        }
    })
})

    
// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
    
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
// const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic");       
  
app.get("/",function(req,res){
    res.render("Signup");
})
    
app.post("/uploadProfilePicture",function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            res.send("Success, Image uploaded!")
        }
    })
})



// 
// // Importing the module
// const express=require("express")
  
// // Creating express Router
// const router=express.Router()
  
// // Handling login request
// router.get("/login",(req,res,next)=>{
//   res.send("This is the login request")
// })
// module.exports=router




// const express=require("express")
// // Importing all the routes
// const homeroute=require("./routes/Home.js")
// const loginroute=require("./routes/login")
  
// // Creating express server
// const app=express()
  
// // Handling routes request
// app.use("/",homeroute)
// app.use("/",loginroute)
// app.listen((3000),()=>{
//     console.log("Server is Running")
// })


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { address: "Park Lane 38" };
//   dbo.collection("customers").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { address: "Park Lane 38" };
//   dbo.collection("customers").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { address: "Park Lane 38" };
//   dbo.collection("customers").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { address: "Park Lane 38" };
//   dbo.collection("customers").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { address: "Park Lane 38" };
//   dbo.collection("customers").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


// const express = require("express");
// const app = express();
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const PORT = 4000;
 
// // Initialization
// app.use(cookieParser());
 
// app.use(session({
//     secret: "amar",
//     saveUninitialized: true,
//     resave: true
// }));
 
// // User Object
 
// const user = {
//     name: "Amar",
//     Roll_number: 43,
//     Address: "Pune"
// };
 
// // Login page
// app.get("/login", (req, res) => {
//     req.session.user = user;
//     req.session.save();
//     return res.send("Your are logged in");
// });
 
// app.get("/user", (req, res) => {
//     const sessionuser = req.session.user;
//     res.send(sessionuser);
// });
 
// // Logout page
// app.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.send("Your are logged out ");
// });
 
// // Host
// app.listen(PORT, () => console.log(`Server at ${PORT}`));


// const express = require('express');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
  
// const app = express();
  
// // Set up Global configuration access
// dotenv.config();
  
// let PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });
  
// // Main Code Here  //
// // Generating JWT
// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token
  
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.send(token);
// });
  
// // Verification of JWT
// app.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in header of request
//     // Due to security reasons.
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//         const token = req.header(tokenHeaderKey);
  
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             // Access Denied
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });

// const express = require('express');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
  
// const app = express();
  
// // Set up Global configuration access
// dotenv.config();
  
// let PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });
  
// // Main Code Here  //
// // Generating JWT
// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token
  
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.send(token);
// });
  
// // Verification of JWT
// app.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in header of request
//     // Due to security reasons.
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//         const token = req.header(tokenHeaderKey);
  
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             // Access Denied
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });

// const express = require('express');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
  
// const app = express();
  
// // Set up Global configuration access
// dotenv.config();
  
// let PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });
  
// // Main Code Here  //
// // Generating JWT
// app.post("/user/generateToken", (req, res) => {
//     // Validate User Here
//     // Then generate JWT Token
  
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
  
//     const token = jwt.sign(data, jwtSecretKey);
  
//     res.send(token);
// });
  
// // Verification of JWT
// app.get("/user/validateToken", (req, res) => {
//     // Tokens are generally passed in header of request
//     // Due to security reasons.
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//         const token = req.header(tokenHeaderKey);
  
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             // Access Denied
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         // Access Denied
//         return res.status(401).send(error);
//     }
// });


// PORT = 5000
  
// JWT_SECRET_KEY = gfg_jwt_secret_key
  
// TOKEN_HEADER_KEY = gfg_token_header_key


// const express = require('express');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
  
// const app = express();
  
// // Set up Global configuration access
// dotenv.config();
  
// let PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });