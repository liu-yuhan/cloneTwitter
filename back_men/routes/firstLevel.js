/*
    define all the route start with "localhost:4000/"
*/
var express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds= 10;
const UserModel = require("../db/db_model").UserModel;

router.post('/register', function(req, res) {
  const {email, username, password} = req.body
  UserModel.findOne({"email" :  email},function(err,user){
    if (err) throw err;
    if(user){
      res.send("Email has been registed, please verify")
      res.end()
    }    
    else{
      bcrypt.hash(password, saltRounds, function(err, hash_pwd) {
          if(err) throw err
         // bcrypt.hash(email, saltRounds,function(err, hash_email){
          //    if (err) throw err
              const user = new UserModel({
                username:username, 
                email : email,
                password:hash_pwd
              })
              user.save(function(err,newUser){
                    res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
                    res.send({code: 0, data: {_id: user._id, username,email, password}})  
                    console.log(user);
              })
       //})
      })
    }
  })
})


router.post('/login', function (req, res ) {
    const {email,password}  = req.body
    UserModel.findOne(
        {"email" : email},
        function(err, user){
            if(err) throw err
            if(!user){
                res.send("Login failed, please verify email and password" )
                res.end
                }
            else{
                console.log(user)
                bcrypt.compare(password, user.password, function(err,result){
                    if (err)  throw err
                    if (!result){
                      res.send("Login failed, please verify email and password" )
                      res.end
                    }
                    else{
                      res.send("Login seccessful, Welcome")
                      res.redirect('/');
                    }
                })
                }
            }
        )   
    });
  

// router.post("/test", function(req, res){
//   console.log(req.body)
//   res.send({
//       response: "you sent me a POST request",
//       body: req.body
//   })
// });



module.exports = router