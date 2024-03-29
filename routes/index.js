require("dotenv").config();
var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require("./users");
const localStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/vaibhav', function(req, res, next) {
  res.send("helloooo");
});
router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});
router.get('/reset', function(req, res, next) {
  res.render('reset');
});
router.get('/username', function(req, res, next) {
  res.render('username');
});
router.get('/welcome', auth, function(req, res, next) {
  res.render("welcome");
});
router.get('/welcome/viewreminder', function(req, res, next) {
  res.render("viewreminder");
});
router.get('/welcome/viewto-do', function(req, res, next) {
  res.render("viewto-do");
});
router.get('/welcome/viewnotes', function(req, res, next) {
  res.render("viewnotes");
});
router.get('/welcome/todo', function(req, res, next) {
  res.render("to-do");
});
router.get('/welcome/reminder', function(req, res, next) {
  res.render("reminder");
});
router.get('/welcome/notes', function(req, res, next) {
  res.render("notes");
});
router.post("/register", async function(req, res){
  try{

    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if(password === cpassword ) {
    const userData = new userModel({
          firstname:req.body.firstname,
           lastname:req.body.lastname,
           address:req.body.address,
           pincode:req.body.pincode,
           gender: req.body.gender,
           email:req.body.email,
          phonenumber: req.body.phonenumber,
           country:req.body.country,
           bio:req.body.bio,
         dob:req.body.dob,
         username:req.body.username,
         password:password
         
          
      })

      const token = await userData.generateAuthToken();

      res.cookie("jwt", token, {
         expires: new Date(Date.now() +30000),
         httpOnly:true
      });
   
      const registered = await userData.save();
      console.log("the page part" + registered );
      res.status(201).render("signin");
    }else{
      res.send("password are not matching")
    }
  }catch(err) {
    res.status(400).send(err);       
  }

})
router.post("/login", async function(req, res){
try {
  const username = req.body.username;
  const password = req.body.password;

  const usernames = await userModel.findOne({username:username});

  const token = await usernames.generateAuthToken();

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30000),
    httpOnly:true,
 });

  if (usernames.password === password) {
    res.status(201).render("welcome")
    
  } else {
    res.send("password are not match")
  }

  
} catch (error) {
  res.status(400).send("invalid username")
}

})
router.post("/forgot", async function(req, res){
  try {
    let email = req.body.email;
    let dob = req.body.dob;
   // console.log(email);
    const usernames = await userModel.findOne({dob:dob});
    //console.log(usernames);
  
    const token = await usernames.generateAuthToken();
  
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly:true,
   });
// console.log(usernames.email);
    if (usernames.email === email) {
      res.status(201).render("reset")
      
    } else {
      res.send("dob are not match")
    }
  
    
  } catch (error) {
    res.status(400).send("invalid email")
  }
  })
  router.post("/reset", async function(req, res){
    try {
        const { email, password } = req.body;

        // Assuming newPassword is already hashed securely

        // Assuming you have a MongoDB connection and a users collection
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email }, // Search criteria, assuming email is unique
            { $set: { password: password } }, // Update password field
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).render("signin")
    } catch (error) {
        console.error("Error occurred during password update:", error);
        res.status(500).json({ error: "An error occurred during password update" });
    }
});

// router.post("/register", async function(req, res){
//   const userData = new userModel({
//     firstname:req.body.firstname,
//     lastname:req.body.lastname,
//     address:req.body.address,
//     pincode:req.body.pincode,
//     gender: req.body.gender,
//     email:req.body.email,
//     phonenumber: req.body.phonenumber,
//     country:req.body.country,
//     bio:req.body.bio,
//     dob:req.body.dob,
//     username:req.body.username,
//   });

// await userModel.register(userData, req.body.password)
// .then(function(){
//   passport.authenticate("local")(req,res,function(){
//     res.redirect("/profile");
//   })
// })
// })
// router.post("/login",passport.authenticate("local",{
// successRedirect: "/profile",
// failureRedirect: "/"
// }), function(req, res){

// });

// router.get("/logout", async function(req,res){
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });
// function isloggedIn(req,res,next){
//   if(req.isAuthenticated())return next();
//   res.redirect("/");
// }


module.exports = router;
