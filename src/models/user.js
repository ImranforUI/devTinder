const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : { type : String, maxLength : 50, minLenght : 4},
    lastName : { type : String},
    emailId : { type : String, unique : true, lowercase : true, required : true, time : true},
    password : { type : String, required : true},
    age : { type : Number, min : 18},
    gender : { type : String,
        validate(value){
            if(!['male', 'female', 'others'].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl : {
        type : String,
        default : "https://tse3.mm.bing.net/th?id=OIP.w0TcjC4y9CxTrY3sitYa_AAAAA&pid=Api&P=0&h=180",
    },
    about : {
        type : String,
        default : "This is a default about of the user",
    },
    skills : {
       type : [String]
    }
},{ timestamps : true});

module.exports = mongoose.model('User', userSchema);