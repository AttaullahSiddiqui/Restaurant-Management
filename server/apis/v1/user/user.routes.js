'use strict';

let express     = require('express');
let userCtrl    = require('./user.controller');
let service     = require('../../../core/app.service');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/user' 

    /* Users API*/
    //router.post('/auth/me',        service.validateToken, userCtrl.getUserDetails)
    router.post('/new',             userCtrl.createUser);
    router.post('/login',           userCtrl.authUser);
    router.get('/account-requests', userCtrl.getNewUsersRequest);
    router.get('/all',             userCtrl.getAllUsers);
    //router.put('/changepassword',  service.validateToken, userCtrl.changePassword);
    // router.put('/updaterole',      userCtrl.updateRole);
    
    // router.delete('/remove',       userCtrl.removeUser);
   
    return router;
};