const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/formdb",{
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then(()=>console.log('connected to db')).catch(err => console.log(err));

const userSchema = mongoose.Schema({ 
  firstname:{
    type : String,
    required:true
    
  },
  lastname:{
    type : String,
    required:true
    
  },
  address:{
    type:String,
    required:true
    
  },
  pincode:{
    type:Number,
    required:true
  },
  gender: {
    type: String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phonenumber: {
    type: Number,
    required:true
    
  },
  country:{
    type:String,
    required:true
  },
  bio:{
    type:String,
    required:true
  },
  dob:{
    type:Date,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  tokens:[{
      token:{
        type:String,
        required:true
      }
  }]
})

userSchema.methods.generateAuthToken = async function(){
  try {
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part" + error);
    
  }

}


userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema );