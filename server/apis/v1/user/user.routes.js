'use strict';

let express     = require('express');
let userCtrl    = require('./user.controller');
let service     = require('../../../core/app.service');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/user' 

    /* Users API*/
    // router.get('/auth/me',        service.validateToken, userCtrl.getUserDetails)
    router.get('/auth/me',          service.validateToken, userCtrl.getUserDetails)
    router.post('/new',             userCtrl.createUser);
    router.post('/login',           userCtrl.authUser);
    router.get('/requests', userCtrl.getNewUsersRequest);
    router.get('/all',             userCtrl.getAllUsers);
    //router.put('/changepassword',  service.validateToken, userCtrl.changePassword);
    // router.put('/updaterole',      userCtrl.updateRole);
    
    // router.delete('/remove',       userCtrl.removeUser);
    router.put('/update/request', userCtrl.updateUserRequest);
    router.put('/update/status', userCtrl.updateUserStatus);
   
    return router;
};