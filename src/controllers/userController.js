const userController = {};

const userFactory = require('../factory/userFactory')

const event_bus_url = process.env.EVENT_BUS_URL

userController.signUp = {
    description: 'User Sign UP',
    notes: 'User Sign UP',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.signUp(req,res)
        }
    }
}

userController.login = {
    description: 'User login',
    notes: 'User login',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.login(req,res)
        }
    }
}

userController.logout = {
    description: 'User logout',
    notes: 'User logout',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.logout(req,res)
        }
    }
}

userController.getAllUsers = {
    description: 'Get all the Users',
    notes: 'Get all the Users',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.getAllUsers(req,res)
        }
    }
}

userController.getMe = {
    description: 'Get current logged user',
    notes: 'Get current logged user',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.getMe(req,res)
        }
    }  
} 

userController.updateMe = {
    description: 'Update current logged user',
    notes: 'Update current logged user',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.updateMe(req,res)
        }
    }  
}

userController.deleteMe = {
    description: 'Delete current logged user',
    notes: 'Delete current logged user',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.deleteMe(req,res)
        }
    }  
}

userController.uploadProfile = {
    description: 'Upload current user profile',
    notes: 'Delete current user profile',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.uploadProfile(req,res)
        }
    } 
} 

userController.deleteProfile = {
    description: 'delete current user profile',
    notes: 'delete current user profile',
    tags: ['api','Users'],
    config:{
        handler: (req,res)=>{
            userFactory.deleteProfile(req,res)
        }
    }     
}

module.exports = userController