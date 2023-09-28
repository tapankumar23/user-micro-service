const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const speakeasy = require('speakeasy');
const {StatusCodes,ResponseMessages,ErrorHandler} = require('@raghu-shop/common')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    },
    age:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    secret:{
        type:String,
    },
    avatar:{
        type:Buffer
    }  
},
{ timestamps: true }
)


userSchema.statics.createUser = async (_user) => {
    try {
        const existingUser =  await User.findOne({ 'email':_user.email });
        if(existingUser)throw new ErrorHandler(ResponseMessages.EMAIL_EXISTS,StatusCodes.FORBIDDEN)
        const user = new User(_user)
        await user.save()
        console.log(user)
        if(!user)throw new Error(ResponseMessages.USER_NOT_CREATED);
        return user
    } catch (error) {
        error.status = error.code || StatusCodes.SERVICE_UNAVAILABLE;
        throw error;
    }
}


userSchema.statics.findByCredential = async ({email,password})=>{
    try {
        //verify user
        const user = await User.findOne({email})
        if(!user)throw new ErrorHandler(ResponseMessages.USER_NOT_PRESENT,StatusCodes.FORBIDDEN);

        //verify password
        const isMatch =await bcrypt.compare(password,user.password) 
        if(!isMatch)throw new ErrorHandler(ResponseMessages.PASSWORD_INVALID,StatusCodes.FORBIDDEN);

        return user

    } catch (error) {
        error.status =error.code || StatusCodes.BAD_REQUEST;
        throw error;       
    }
}

userSchema.statics.deleteUserToken = async({_user,user_token})=>{
    try {
        _user.tokens = _user.tokens.filter((token)=>{
            return token.token !== user_token
        })
        await _user.save()
        return _user

    } catch (error) {
        new Error(ResponseMessages.ERROR);
        error.status = StatusCodes.SERVICE_UNAVAILABLE;
        throw error;
    }
}

userSchema.statics.findByEmail = async (condition)=>{
    try {
        const user = await User.findOne(condition)
        if(!user)throw new ErrorHandler(ResponseMessages.INVALID_EMAIL,StatusCodes.FORBIDDEN);
    return user       
    } catch (error) {
        error.status = error.code || StatusCodes.BAD_REQUEST;
        throw error;
    }

}

userSchema.statics.getAllUsers = async()=>{
    try {
        const users = await User.find({})
        if(!users)throw new StatusCodes.FORBIDDEN(ResponseMessages.ERROR,StatusCodes.FORBIDDEN);
    return users       
    } catch (error) {
        error.status = error.code || StatusCodes.SERVICE_UNAVAILABLE;
        throw error;
    }  
} 

userSchema.statics.updateUser = async({_user,user_body})=>{
    try {
        const updates = Object.keys(user_body)
        updates.forEach((update)=>_user[update]=user_body[update])
        await _user.save()
    return _user       
    } catch (error) {
        new Error(ResponseMessages.ERROR);
        error.status = StatusCodes.SERVICE_UNAVAILABLE;
        throw error;
    }  
} 

userSchema.statics.deleteMe = async({_user})=>{
    try {
        await _user.remove() 
        return _user       
    } catch (error) {
        new Error(ResponseMessages.ERROR);
        error.status = StatusCodes.SERVICE_UNAVAILABLE;
        throw error;        
    }
}

userSchema.statics.saveUserProfile = async(_user)=>{
    try {
        await _user.save()
        return _user       
    } catch (error) {
        new Error(ResponseMessages.ERROR);
        error.status = StatusCodes.SERVICE_UNAVAILABLE;
        throw error;        
    }
}

userSchema.statics.deleteCurrentUserProfile = async(_user)=>{
    try {
        await _user.save()
        return _user       
    } catch (error) {
        new Error(ResponseMessages.ERROR);
        error.status = StatusCodes.SERVICE_UNAVAILABLE;
        throw error;        
    }
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
} 

//genarate otp
userSchema.methods.generateOtp = async function(){
    const user = this
    const secret = speakeasy.generateSecret({length: 20});
    const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    }); 
    if(!otp){
        throw new Error('otp failed');
    }
    user.secret = secret.base32  
    await user.save()
    return {otp} 
}

//method to hide private data / send only public data to api response
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}
//hash the plain text password before saveing
userSchema.pre('save',async function(next){
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,10)
        }
    next()
})

//get user information
userSchema.statics.getUserInfo =async (decoded_user,token)=>{
    try {
        console.log('inside user')
        const user = await User.findOne({_id:decoded_user._id,'tokens.token':token}) 
        console.log(user)
        if(!user){
            console.log("inside auth")
            throw new Error(ResponseMessages.AUTH_FAILED);
        }
     return user      
    } catch (error) {
        error.status = StatusCodes.BAD_REQUEST;
        throw error;        
    }

}


const User = mongoose.model('User',userSchema)

module.exports = User