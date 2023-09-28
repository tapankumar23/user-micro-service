const userOtpController = {};

const userOTP = require('../factory/userOtpFactory');

userOtpController.generateOtp ={
    description: 'Generate OTP for the User who has email',
    notes: 'Generate OTP for the User who has email',
    tags: ['api','UserVerification'],
    config:{
        handler: (req,res)=>{
            userOTP.generateOtp(req,res)
        }
    }
}

userOtpController.verifyOtp = {
    description: 'Verify OTP of the User',
    notes: 'Verify OTP of the User',
    tags: ['api','UserVerification'],
    config:{
        handler: (req,res)=>{
            userOTP.verifyOtp(req,res)
        }
    }
}

module.exports= userOtpController