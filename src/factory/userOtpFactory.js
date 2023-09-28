const User = require('../models/user');
const {sendOtpInEmail} = require('../services/email')
const {Response,StatusCodes,ResponseMessages,verifyOTP} = require('@raghu-shop/common')



/**
 * @param request
 * @param reply
 */

const generateOtp = async(req,res)=>{

    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)
        const condition = {
            email: req.body.email, 
            _id: userInfo._id
        };
        const user = await User.findByEmail(condition)
        const {otp} = await user.generateOtp();
        await sendOtpInEmail(user.email,user.name,otp)
        res.status(StatusCodes.OK).json(Response.sendResponse(true,otp,ResponseMessages.SUCCESS,StatusCodes.OK));
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

const verifyOtp = async(req,res)=>{
    try {
        const userInfo = await User.getUserInfo(req.decoded,req.token)
        const isvaildOtp = await verifyOTP(userInfo.secret,req.body.otp)
        if(!isvaildOtp){
           return res.status(StatusCodes.BAD_REQUEST).json(Response.sendResponse(false,null,ResponseMessages.INVALID_OTP,StatusCodes.BAD_REQUEST));
         }
        res.status(StatusCodes.OK).json(Response.sendResponse(true,isvaildOtp,ResponseMessages.OTP_VERIFIED,StatusCodes.OK));
    } catch (err) {
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(Response.sendResponse(false,null,err.message || ResponseMessages.ERROR,err.status || StatusCodes.INTERNAL_SERVER_ERROR));
    }
}
module.exports={
    generateOtp,
    verifyOtp
}