'use strict';
let express = require('express');
let userCtrl = require('./user.controller');

let router  = express.Router();

module.exports = function (){

    // :: Prefix Path --- '/api/v1/user' 
    
    router.post('/login', function(req, res){

    })

  // router.post('/register', userCtrl.register)

   router.get('/me', function(req, res){

   })

   router.put('/update-status', function(req, res){

   })

   router.put('/update-role', function(req, res){

   });
   
    return router;
};