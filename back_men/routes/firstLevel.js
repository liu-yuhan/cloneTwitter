    /*
    define all the route start with "localhost:4000/"
    */
    var express = require('express');
    const router = express.Router();
    const bcrypt = require('bcrypt');
    const saltRounds= 10;
    const UserModel = require("../db/db_model").UserModel;

    /* 
    function register. if email existed, return a msg, to tell user email has been used,
    otherwise, stock data in collection user.
    */ 
    router.post('/register', function (req, res) {
        console.log('register connected')
        const{ username, email , password}  = req.body
        console.log(req.body);
        UserModel.findOne({'email': email}, function(err,user){
            if (err) throw err;
            if(user){
              res.send({code:1,msg:"Email has been registed, please verify"})
            }    
            else{
                bcrypt.hash(password, saltRounds, function(err, hash_pwd) {
                    if(err) throw err
                    const user = new UserModel({
                        username: username, 
                        email : email,
                        password:hash_pwd
                    })
                    user.save(function(err,NewUser){
                    res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
                    res.send({code: 0, data: {_id: user._id, username,email}})  
                    console.log('user', user);
                    })
              //})
              })
            }
          })
      })

    /* 
    function login. check email exist, if so, continu to check if password equal to password in collection,
    othwise all return msg to check email and psw
    */ 
    router.post('/login', function (req, res ) {
        console.log('login connected')
        const {email , password}  = req.body  
        UserModel.findOne(
            {"email" : email},
            function(err, user){
                if(err) throw err
                if(!user){
                    res.send({code:1, msg:'Login failed, please verify email and password' })
                    }
                else{
                    console.log('user: ', user)
                    bcrypt.compare(password, user.password, function(err,result){
                        if (err)  throw err
                        if (!result){
                          res.send({code:1,msg:' Login failed, please verify email and password'} )
                        }
                        else{
                          res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
                          console.log("set cookies: " ,req.cookies)
                          res.send({code:0, data:'Login seccessful, Welcome'})
                        }
                    })
                    }
                })   
        });

    /*
    Userspace function, should return all in formation of the user login.
    2 part: profil in user db, twit in twig db
    */
    router.get('/myspace',function(req,res){   
        console.log('myspace connected');
        const userid = req.cookies.userid
        if (!userid){
            res.send({
                code:1, msg:'please Login first'
            })
        }
          UserModel.findOne({'_id':userid}, function(err,user){
          if (err) throw err
          if (!user) {
            res.send({code:1, msg:'wired, user not found'  })
          }else{
            res.send({
                code:0, data:{
                  photo: user.photo,
                  email : user.email,
                  username: user.username, 
                  summary : user.summary
                }
            })
          }
        })
    })

  

// router.post("/test", function(req, res){
//   console.log(req.body)
//   res.send({
//       response: "you sent me a POST request",
//       body: req.body
//   })
// });



module.exports = router