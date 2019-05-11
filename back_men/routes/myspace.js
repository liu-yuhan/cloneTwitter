var express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds= 10;
const UserModel = require("../db/db_model").UserModel;
const mongoose = require('mongoose');

router.post('/update',function(req,res){
    const userid =req.cookies.userid
    const {username, email, password, photo, summary} = req.body
    if (!userid){       
        res.send({code:1,msg:"Please login first"  })
    }
    UserModel.findOne({'_id':userid},function (err,user) {
        if(err) throw err
        if(!user){
            res.send({code:1, msg:"User not found " }) 
        }
        if(user.email !== email){          
            res.send({code:1, msg:"Email not identical, pleace varify." })
        }
        else{
            bcrypt.hash(password, saltRounds, function(err, hash_pwd) {
                if(err) throw err
                UserModel.findOneAndUpdate({'_id':userid },{username, email, 'password': hash_pwd, photo, summary}, function(err,user){
                    if(err) throw err
                    res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
                    res.send({code: 0, data: {'_id': user._id, username,email,photo,summary}})  
                })
             //})
            })
          }
    } )
})


module.exports = router