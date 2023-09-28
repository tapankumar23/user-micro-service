const express = require('express');
const {auth,validate,profileUpload} = require('@raghu-shop/common')
const userController = require('../controllers/userController');
const userOtpController = require('../controllers/userOtpController');
 const user_validations = require('../validations/user_validations')

const userRoutes = new express.Router()

userRoutes.route('/api/user/sign-up').post(validate(user_validations.user_payload),(req,res) => {userController.signUp.config.handler(req,res)}); 
userRoutes.route('/api/user/login').post(validate(user_validations.user_login_payload),(req,res) => {userController.login.config.handler(req,res)});
userRoutes.route('/api/user/logout').post(auth,(req,res) => {userController.logout.config.handler(req,res)});
userRoutes.route('/api/user/get-all-users').get(auth,(req,res) => {userController.getAllUsers.config.handler(req,res)});
userRoutes.route('/api/user/me').get(auth,(req,res) => {userController.getMe.config.handler(req,res)})
userRoutes.route('/api/user/me').patch(auth,validate(user_validations.user_updation_payload),(req,res) => {userController.updateMe.config.handler(req,res)})
userRoutes.route('/api/user/me').delete(auth,(req,res) => {userController.deleteMe.config.handler(req,res)});
userRoutes.route('/api/user/me/avatar').post(auth,profileUpload.single('fileUpload'),(err,req,res,next) => res.status(400).send({error:err.message}),(req,res) => {userController.uploadProfile.config.handler(req,res)});
userRoutes.route('/api/user/me/avatar').delete(auth,(req,res) => {userController.deleteProfile.config.handler(req,res)});

//otp genaraters
userRoutes.route('/api/user/generate-otp').post(auth,validate(user_validations.generate_otp_payload),(req, res) => {userOtpController.generateOtp.config.handler(req, res)});
userRoutes.route('/api/user/verify-otp').post(auth,validate(user_validations.varify_otp_payload),(req,res) => {userOtpController.verifyOtp.config.handler(req,res)}); 

module.exports = userRoutes;