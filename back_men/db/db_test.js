/*
test for mongoose connect mongoDb
*/

const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        bcrypt = require('bcrypt'),
        SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://127.0.0.1:27017/react_test', { useNewUrlParser: true });
const connection = mongoose.connection;
        
connection.once('open', function(){
       console.log("mongodb database connection etablished successfully" );
    } )