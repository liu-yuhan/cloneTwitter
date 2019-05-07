const mongoose = require('mongoose');
const Schema = mongoose.Schema;
       

mongoose.connect(
    'mongodb://127.0.0.1:27017/react_test', 
    { useNewUrlParser: true }
    );

const connection = mongoose.connection;
        
connection.on(
    'connected', function(){
       console.log(
           "mongodb database connection etablished successfully" 
           );
    })

const userSchema =new Schema({
    username : {type : String, required : true},
    email  : {type : String , required:true, index: { unique: true }  },
    password : {type:String, required:true }
})

//mongoose.model("someNickname of this model", "the Schema used")
const UserModel = mongoose.model('user', userSchema)
// 2.3. 向外暴露 Model
exports.UserModel = UserModel