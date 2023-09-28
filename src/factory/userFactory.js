const sharp = require('sharp')

const User = require('../models/user');
const {Response,StatusCodes,ResponseMessages} = require('@raghu-shop/common')

const signUp = async(req,res)=>{
    try {
        const user = await User.createUser(req.body)
        const token = await user.generateAuthToken()
        console.log("user token",token)
        res.status(StatusCodes.CREATED).json(Response.sendResponse(true,user,ResponseMessages.SUCCESS,StatusCodes.CREATED));
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
 
    }
}

const login = async(req,res)=>{
    const condition = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const user = await User.findByCredential(condition)
        const token = await user.generateAuthToken()
        console.log("user token",token)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,user,ResponseMessages.SUCCESS,StatusCodes.OK));  
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const logout = async(req,res)=>{
    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)
        const condition = {
            _user: userInfo,
            user_token: req.token
        }
        const user = await User.deleteUserToken(condition)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,null,ResponseMessages.SUCCESS,StatusCodes.OK));  
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.getAllUsers()
        res.status(StatusCodes.OK).json(Response.sendResponse(true,users,ResponseMessages.SUCCESS,StatusCodes.OK));  
     } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
     } 
}

const getMe = async(req,res)=>{
    try {
        const user = await User.getUserInfo(req.decoded,req.token)       
        res.status(StatusCodes.OK).json(Response.sendResponse(true,user,ResponseMessages.SUCCESS,StatusCodes.OK));  
     } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
     } 
}

const updateMe = async(req,res)=>{
    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)
        const condition = {
            _user: userInfo,
            user_body: req.body
        }
        const user = await User.updateUser(condition)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,user,ResponseMessages.SUCCESS,StatusCodes.OK));  
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
    }    
}

const deleteMe = async(req,res)=>{
    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)
        const condition = {
            _user: userInfo
        }
        const user = await User.deleteMe(condition)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,userInfo,ResponseMessages.SUCCESS,StatusCodes.OK));  
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const uploadProfile = async(req,res)=>{
    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)   
        userInfo.avatar = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer() 
        const user = await User.saveUserProfile(userInfo)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,user,ResponseMessages.SUCCESS,StatusCodes.OK));        
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));       
    }
}

const deleteProfile = async(req,res)=>{
    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)   
        userInfo.avatar = undefined
        const user = User.deleteCurrentUserProfile(userInfo)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,user,ResponseMessages.SUCCESS,StatusCodes.OK));        
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));       
    }
} 

module.exports = {
    signUp,
    login,
    logout,
    getAllUsers,
    getMe,
    updateMe,
    deleteMe,
    uploadProfile,
    deleteProfile

}