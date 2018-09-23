'use strict';
let express     = require('express');
let router      = express.Router();
let userRoutes  = require('../../apis/v1/user/user.routes')();

module.exports = function (){

    // :: Prefix Path --- '/api/v1'
    router.use('/user', userRoutes);
    
    return router;
}

